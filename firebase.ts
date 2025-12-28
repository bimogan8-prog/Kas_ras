
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// --- PANDUAN PENTING ---
// Ganti objek firebaseConfig di bawah ini dengan konfigurasi
// dari proyek Firebase Anda sendiri. Anda bisa mendapatkannya dari
// Firebase Console: Project Settings > General > Your apps > SDK setup and configuration.
//
// KESALAHAN FATAL akan terjadi jika placeholder ini tidak diganti.
const firebaseConfig = {
  apiKey: "PASTIKAN_INI_API_KEY_ANDA",
  authDomain: "kasras-be2f9.firebaseapp.com",
  // URL telah diperbarui sesuai permintaan Anda.
  databaseURL: "https://kasras-be2f9-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "kasras-be2f9",
  storageBucket: "kasras-be2f9.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor instance database untuk digunakan di hook
export const db = getDatabase(app);