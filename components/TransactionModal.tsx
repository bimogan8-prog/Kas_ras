
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction, TransactionData, incomeCategories, expenseCategories } from '../types';
import { GlassCard } from './ui/GlassCard';
import { XIcon } from './icons/XIcon';
import { CustomSelect } from './CustomSelect';
import { DatePickerModal } from './DatePickerModal';
import { formatDate } from '../utils/formatters';
import { CalendarIcon } from './icons/CalendarIcon';
import { ImageUploader } from './ImageUploader';
import { uploadToCloudinary } from '../utils/cloudinary';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transactionData: TransactionData, id?: string) => void;
  transaction: Transaction | null;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave, transaction }) => {
  const [type, setType] = useState<'debit' | 'credit'>('credit');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [buktiUrl, setBuktiUrl] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setType(transaction.type);
      setAmount(String(transaction.amount));
      setDescription(transaction.description);
      setCategory(transaction.category);
      setDate(new Date(transaction.date));
      setBuktiUrl(transaction.buktiUrl);
    } else {
      // Reset form
      setType('credit');
      setAmount('');
      setDescription('');
      setCategory('');
      setDate(new Date());
      setBuktiUrl(undefined);
    }
    setImageFile(null);
    setIsUploading(false);
  }, [transaction, isOpen]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description || !category) {
      alert('Mohon isi semua field.');
      return;
    }
    
    setIsUploading(true);
    let finalBuktiUrl = buktiUrl;

    if (imageFile) {
      try {
        finalBuktiUrl = await uploadToCloudinary(imageFile);
      } catch (error) {
        console.error("Gagal mengunggah gambar:", error);
        alert("Gagal mengunggah gambar bukti. Silakan coba lagi.");
        setIsUploading(false);
        return;
      }
    }

    const transactionData: TransactionData = {
      date: date.toISOString(),
      description,
      category,
      type,
      amount: parseFloat(amount),
      buktiUrl: finalBuktiUrl,
    };
    onSave(transactionData, transaction?.id);
    setIsUploading(false);
  };
  
  const categories = type === 'debit' ? incomeCategories : expenseCategories;
  
  useEffect(() => {
    if (transaction?.type !== type) {
      setCategory('');
    }
  }, [type, transaction]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-md"
      >
        <GlassCard className="p-4 md:p-6 relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full z-10"
            aria-label="Close modal"
          >
            <XIcon className="w-5 h-5" />
          </motion.button>
          <h2 className="text-xl font-bold mb-6">{transaction ? 'Edit Transaksi' : 'Tambah Transaksi'}</h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <button type="button" onClick={() => setType('credit')} className={`py-3 rounded-lg text-sm font-semibold transition-all ${type === 'credit' ? 'bg-red-500/20 text-red-300 ring-1 ring-red-500/50' : 'bg-slate-800/60 text-gray-400 hover:bg-slate-700/60'}`}>Kredit (Beban)</button>
              <button type="button" onClick={() => setType('debit')} className={`py-3 rounded-lg text-sm font-semibold transition-all ${type === 'debit' ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/50' : 'bg-slate-800/60 text-gray-400 hover:bg-slate-700/60'}`}>Debit (Pemasukan)</button>
            </div>

            <div>
              <label htmlFor="amount" className="text-xs text-gray-400 mb-1 block">Jumlah (IDR)</label>
              <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0" className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>

            <div>
              <label htmlFor="description" className="text-xs text-gray-400 mb-1 block">Deskripsi</label>
              <input id="description" type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Contoh: Bayar Sewa Kantor" className="w-full bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
            </div>

            <CustomSelect label="Kategori" options={categories} selectedValue={category} onSelect={setCategory} />

            <div>
                <label className="text-xs text-gray-400 mb-1 block">Tanggal</label>
                <button type="button" onClick={() => setIsDatePickerOpen(true)} className="w-full flex items-center justify-between bg-slate-800/60 border border-white/10 rounded-lg px-4 py-3 text-white text-left focus:outline-none focus:ring-1 focus:ring-indigo-500">
                    <span>{formatDate(date.toISOString())}</span>
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            <ImageUploader 
              onFileChange={setImageFile} 
              existingImageUrl={buktiUrl}
              onClearImage={() => {
                setBuktiUrl(undefined);
                setImageFile(null);
              }}
            />
            
            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUploading}
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg mt-2 hover:bg-indigo-500 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:bg-indigo-800 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isUploading ? (
                <>
                  <motion.div 
                    className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Menyimpan...
                </>
              ) : 'Simpan'}
            </motion.button>
          </form>
        </GlassCard>
      </motion.div>
      <AnimatePresence>
        {isDatePickerOpen && (
            <DatePickerModal 
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onSelectDate={(selectedDate) => { setDate(selectedDate); setIsDatePickerOpen(false); }}
                initialDate={date}
            />
        )}
      </AnimatePresence>
    </div>
  );
};
