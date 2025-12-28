
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloudIcon } from './icons/UploadCloudIcon';
import { XIcon } from './icons/XIcon';
import { TrashIcon } from './icons/TrashIcon';

interface ImageUploaderProps {
  onFileChange: (file: File | null) => void;
  existingImageUrl?: string;
  onClearImage: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileChange, existingImageUrl, onClearImage }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(existingImageUrl || null);
  }, [existingImageUrl]);

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      onFileChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };
  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  const onDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const clearSelection = () => {
    setPreview(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onClearImage();
  };

  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">Bukti Transaksi (Opsional)</label>
      <AnimatePresence mode="wait">
        {preview ? (
          <motion.div
            key="preview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full aspect-[4/3] rounded-lg overflow-hidden border-2 border-dashed border-white/10"
          >
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={clearSelection}
                className="p-3 bg-red-600/80 backdrop-blur-sm rounded-full text-white"
                aria-label="Hapus Gambar"
              >
                <TrashIcon className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.label
            key="uploader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            htmlFor="file-upload"
            className={`w-full aspect-[4/3] rounded-lg border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-colors
              ${isDragging ? 'border-indigo-500 bg-indigo-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}`
            }
            onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDragOver={onDragOver} onDrop={onDrop}
          >
            <UploadCloudIcon className="w-8 h-8 text-gray-400 mb-2" />
            <p className="text-sm font-semibold text-gray-300">Seret & Lepas atau Klik</p>
            <p className="text-xs text-gray-500">untuk mengunggah bukti</p>
            <input
              id="file-upload"
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => handleFileSelect(e.target.files ? e.target.files[0] : null)}
            />
          </motion.label>
        )}
      </AnimatePresence>
    </div>
  );
};
