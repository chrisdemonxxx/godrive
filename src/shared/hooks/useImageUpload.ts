import { useState } from 'react';
import { supabase } from '@/shared/lib/supabase';
import { logError } from '@/utils/errors';

export interface UseImageUploadReturn {
  upload: (file: File, bucket: string, path: string) => Promise<string | null>;
  uploadMultiple: (files: File[], bucket: string, basePath: string) => Promise<string[]>;
  uploading: boolean;
  error: string | null;
  progress: number;
}

/**
 * Compress image before upload (client-side)
 */
async function compressImage(file: File, maxWidth = 1920, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Validate image file
 */
function validateImage(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only JPEG, PNG, and WebP images are allowed' };
  }

  if (file.size > maxSize) {
    return { valid: false, error: 'Image size must be less than 5MB' };
  }

  return { valid: true };
}

/**
 * Hook for uploading images to Supabase Storage
 */
export function useImageUpload(): UseImageUploadReturn {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const upload = async (file: File, bucket: string, path: string): Promise<string | null> => {
    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      // Validate file
      const validation = validateImage(file);
      if (!validation.valid) {
        throw new Error(validation.error);
      }

      // Compress image
      const compressedFile = await compressImage(file);

      // Upload file
      const { data, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(path, compressedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) {
        throw uploadError;
      }

      setProgress(100);

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from(bucket).getPublicUrl(data.path);

      return publicUrl;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload image';
      logError('Image upload failed', err);
      setError(errorMessage);
      return null;
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const uploadMultiple = async (
    files: File[],
    bucket: string,
    basePath: string
  ): Promise<string[]> => {
    setUploading(true);
    setError(null);
    const urls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const path = `${basePath}/${Date.now()}-${i}-${file.name}`;
        const url = await upload(file, bucket, path);
        if (url) {
          urls.push(url);
        }
        setProgress(((i + 1) / files.length) * 100);
      }

      return urls;
    } catch (err) {
      logError('Multiple image upload failed', err);
      return urls; // Return whatever was uploaded
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return {
    upload,
    uploadMultiple,
    uploading,
    error,
    progress,
  };
}
