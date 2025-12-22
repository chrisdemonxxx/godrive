import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FileUpload } from '@/components';
import { CarFormData } from '@/schemas';
import { useImageUpload } from '@/hooks';
import toast from 'react-hot-toast';

interface Step5PhotosProps {
  form: UseFormReturn<CarFormData>;
}

export default function Step5Photos({ form }: Step5PhotosProps): JSX.Element {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const { upload, uploading } = useImageUpload();

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one image');
      return;
    }

    if (files.length < 3) {
      toast.error('Please upload at least 3 images');
      return;
    }

    // TODO: Upload to Supabase Storage
    // For now, just store file references
    toast.success(`${files.length} images ready to upload`);
  };

  return (
    <div className="space-y-6">
      <div>
        <FileUpload
          label="Car Photos *"
          accept="image/*"
          multiple
          maxFiles={8}
          maxSize={5 * 1024 * 1024} // 5MB
          value={files}
          onChange={handleFilesChange}
          helperText="Upload 3-8 high-quality photos of your car. Minimum 3 required."
          error={files.length > 0 && files.length < 3 ? 'Please upload at least 3 images' : undefined}
        />
      </div>

      {files.length >= 3 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-sm text-green-800">
            ✓ {files.length} image{files.length > 1 ? 's' : ''} ready. Images will be uploaded when you submit the form.
          </p>
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Tips:</strong>
        </p>
        <ul className="text-sm text-blue-700 mt-2 list-disc list-inside space-y-1">
          <li>Include exterior shots from multiple angles</li>
          <li>Show interior (dashboard, seats)</li>
          <li>Highlight any special features</li>
          <li>Use good lighting and clear images</li>
        </ul>
      </div>
    </div>
  );
}
