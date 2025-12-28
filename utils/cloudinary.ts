
// --- Konfigurasi Cloudinary ---
// Nilai-nilai ini telah diperbarui berdasarkan informasi yang Anda berikan.
const CLOUDINARY_CLOUD_NAME = 'dzppwl4q5';
const CLOUDINARY_UPLOAD_PRESET = 'kas_ras';

const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

  const response = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Cloudinary upload error:', errorData);
    throw new Error(`Gagal mengunggah gambar ke Cloudinary: ${errorData.error?.message || 'Unknown error'}`);
  }

  const data = await response.json();
  return data.secure_url;
};
