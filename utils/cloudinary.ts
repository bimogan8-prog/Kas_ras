
// --- PANDUAN PENTING ---
// 1. Ganti 'YOUR_CLOUD_NAME' dengan Cloud Name dari akun Cloudinary Anda.
// 2. Ganti 'YOUR_UPLOAD_PRESET' dengan nama Upload Preset yang telah Anda buat.
//    Pastikan preset tersebut adalah 'Unsigned' untuk kemudahan di sisi klien.
const CLOUDINARY_CLOUD_NAME = 'YOUR_CLOUD_NAME';
const CLOUDINARY_UPLOAD_PRESET = 'YOUR_UPLOAD_PRESET';

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
    throw new Error('Gagal mengunggah gambar ke Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
};
