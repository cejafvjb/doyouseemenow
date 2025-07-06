import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import sharp from "sharp";
import path from "path";
import fs from "fs";
import { insertImageSchema } from "@shared/schema";

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, PNG, and GIF are allowed.'));
    }
  },
});

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Serve uploaded images
  app.use('/uploads', express.static(uploadsDir));

  // Get all images
  app.get('/api/images', async (req, res) => {
    try {
      const images = await storage.getAllImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch images' });
    }
  });

  // Upload images
  app.post('/api/images/upload', upload.array('images'), async (req, res) => {
    try {
      if (!req.files || !Array.isArray(req.files)) {
        return res.status(400).json({ message: 'No files uploaded' });
      }

      const uploadedImages = [];
      
      for (const file of req.files) {
        // Generate unique filename
        const timestamp = Date.now();
        const filename = `${timestamp}-${Math.random().toString(36).substring(2)}${path.extname(file.originalname)}`;
        const filepath = path.join(uploadsDir, filename);

        // Process and save image
        await sharp(file.buffer)
          .resize(800, 800, { 
            fit: 'inside',
            withoutEnlargement: true 
          })
          .jpeg({ quality: 85 })
          .toFile(filepath);

        // Get current max sort order
        const existingImages = await storage.getAllImages();
        const maxSortOrder = existingImages.reduce((max, img) => Math.max(max, img.sortOrder), 0);

        // Save to storage
        const imageData = {
          filename,
          originalName: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          sortOrder: maxSortOrder + 1,
        };

        const validatedData = insertImageSchema.parse(imageData);
        const savedImage = await storage.createImage(validatedData);
        uploadedImages.push(savedImage);
      }

      res.json({ images: uploadedImages });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: 'Failed to upload images' });
    }
  });

  // Update image order (admin only)
  app.patch('/api/images/:id/order', async (req, res) => {
    try {
      const { id } = req.params;
      const { sortOrder } = req.body;

      if (typeof sortOrder !== 'number') {
        return res.status(400).json({ message: 'Invalid sort order' });
      }

      await storage.updateImageOrder(parseInt(id), sortOrder);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update image order' });
    }
  });

  // Admin login
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      res.json({ success: true, message: 'Login successful' });
    } catch (error) {
      res.status(500).json({ message: 'Login failed' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
