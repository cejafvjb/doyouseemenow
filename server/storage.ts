import { images, type Image, type InsertImage } from "@shared/schema";

export interface IStorage {
  // Image methods
  createImage(image: InsertImage): Promise<Image>;
  getAllImages(): Promise<Image[]>;
  updateImageOrder(imageId: number, sortOrder: number): Promise<void>;
  deleteImage(id: number): Promise<void>;
  
  // User methods (for admin auth)
  getUserByUsername(username: string): Promise<{ id: number; username: string; password: string } | undefined>;
}

export class MemStorage implements IStorage {
  private images: Map<number, Image>;
  private currentImageId: number;
  private adminUser = { id: 1, username: 'admin', password: 'admin123' };

  constructor() {
    this.images = new Map();
    this.currentImageId = 1;
  }

  async createImage(insertImage: InsertImage): Promise<Image> {
    const id = this.currentImageId++;
    const image: Image = { 
      id,
      filename: insertImage.filename,
      originalName: insertImage.originalName,
      mimetype: insertImage.mimetype,
      size: insertImage.size,
      sortOrder: insertImage.sortOrder,
      createdAt: new Date()
    };
    this.images.set(id, image);
    return image;
  }

  async getAllImages(): Promise<Image[]> {
    return Array.from(this.images.values())
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  async updateImageOrder(imageId: number, sortOrder: number): Promise<void> {
    const image = this.images.get(imageId);
    if (image) {
      this.images.set(imageId, { ...image, sortOrder });
    }
  }

  async deleteImage(id: number): Promise<void> {
    this.images.delete(id);
  }

  async getUserByUsername(username: string): Promise<{ id: number; username: string; password: string } | undefined> {
    if (username === this.adminUser.username) {
      return this.adminUser;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
