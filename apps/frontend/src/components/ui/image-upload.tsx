'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { VALIDATION } from '@/lib/constants';
import { formatFileSize } from '@/lib/format';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Validate files
    for (const file of files) {
      if (!VALIDATION.ALLOWED_IMAGE_TYPES.includes(file.type)) {
        alert(`Invalid file type: ${file.name}. Only JPEG, PNG, and WebP are allowed.`);
        return;
      }
      if (file.size > VALIDATION.MAX_IMAGE_SIZE) {
        alert(`File too large: ${file.name}. Maximum size is ${formatFileSize(VALIDATION.MAX_IMAGE_SIZE)}.`);
        return;
      }
    }

    if (images.length + files.length > maxImages) {
      alert(`Maximum ${maxImages} images allowed.`);
      return;
    }

    setUploading(true);
    try {
      // Convert files to base64 for preview (in production, upload to cloud storage)
      const base64Images = await Promise.all(
        files.map((file) => {
          return new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.readAsDataURL(file);
          });
        })
      );

      onChange([...images, ...base64Images]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {images.length < maxImages && (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="w-full border-dashed border-2 h-32 hover:border-purple-400 hover:bg-purple-50"
          >
            <div className="flex flex-col items-center gap-2">
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                  <span className="text-sm text-gray-600">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Click to upload images ({images.length}/{maxImages})
                  </span>
                  <span className="text-xs text-gray-400">
                    JPEG, PNG, WebP up to {formatFileSize(VALIDATION.MAX_IMAGE_SIZE)}
                  </span>
                </>
              )}
            </div>
          </Button>
        </div>
      )}

      {/* Image Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200">
              <img
                src={image}
                alt={`Upload ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X size={16} />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs font-semibold">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-8 text-gray-400">
          <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
          <p className="text-sm">No images uploaded yet</p>
        </div>
      )}
    </div>
  );
}
