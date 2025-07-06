import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { apiRequest } from "@/lib/queryClient";
import type { Image } from "@shared/schema";

interface ImageGalleryProps {
  isAdminMode: boolean;
}

export default function ImageGallery({ isAdminMode }: ImageGalleryProps) {
  const queryClient = useQueryClient();

  const { data: images = [], isLoading } = useQuery<Image[]>({
    queryKey: ['/api/images'],
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ imageId, sortOrder }: { imageId: number; sortOrder: number }) => {
      await apiRequest('PATCH', `/api/images/${imageId}/order`, { sortOrder });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/images'] });
    },
  });

  const handleDragEnd = (result: any) => {
    if (!result.destination || !isAdminMode) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    if (startIndex === endIndex) return;

    const reorderedImages = Array.from(images);
    const [movedImage] = reorderedImages.splice(startIndex, 1);
    reorderedImages.splice(endIndex, 0, movedImage);

    // Update sort orders
    reorderedImages.forEach((image, index) => {
      if (image.sortOrder !== index) {
        updateOrderMutation.mutate({
          imageId: image.id,
          sortOrder: index,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="grid gap-2 grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="aspect-square bg-gray-100 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const galleryContent = (
    <div>
      <div className="grid gap-2 grid-cols-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`aspect-square bg-gray-100 ${
              isAdminMode ? 'cursor-move' : 'cursor-pointer'
            }`}
          >
            <img 
              src={`/uploads/${image.filename}`}
              alt={image.originalName}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {images.length > 0 && (
        <div className="text-center mt-8">
          <div className="text-black text-xl main-font">
            KREDIT
          </div>
        </div>
      )}
    </div>
  );

  if (isAdminMode) {
    return (
      <div className="w-full">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="image-gallery" direction="horizontal">
            {(provided: any) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="grid gap-2 grid-cols-3"
              >
                {images.map((image, index) => (
                  <Draggable
                    key={image.id}
                    draggableId={image.id.toString()}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`aspect-square bg-gray-100 cursor-move ${
                          snapshot.isDragging ? 'opacity-50' : ''
                        }`}
                      >
                        <img 
                          src={`/uploads/${image.filename}`}
                          alt={image.originalName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        {images.length > 0 && (
          <div className="text-center mt-8">
            <div className="text-black text-xl main-font">
              KREDIT
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div className="w-full">{galleryContent}</div>;
}
