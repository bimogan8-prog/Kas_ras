
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Transaction } from '../types';
import { formatIDR, formatDate, formatTime } from '../utils/formatters';
import { GlassCard } from './ui/GlassCard';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onPreviewImage: (url: string) => void;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, x: -20, transition: { duration: 0.2 } },
};

export const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit, onDelete, onPreviewImage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isDebit = transaction.type === 'debit';
  const hasAttachment = !!transaction.buktiUrl;

  const handleCardClick = () => {
    if (hasAttachment) {
      onPreviewImage(transaction.buktiUrl!);
    }
  };

  return (
    <motion.li 
      variants={itemVariants} 
      layout 
      className={`relative ${menuOpen ? 'z-10' : 'z-0'}`}
    >
      <GlassCard 
        className={`p-3 flex flex-col ${hasAttachment ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {hasAttachment && <PaperclipIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
              <p className="font-semibold text-white pr-10 text-sm">{transaction.description}</p>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {formatDate(transaction.date)} &bull; {formatTime(transaction.date)} &bull; {transaction.category}
            </p>
          </div>
          <div className="text-right">
             <p className={`font-semibold text-base ${isDebit ? 'text-green-400' : 'text-red-400'}`}>
              {isDebit ? '+' : '-'} {formatIDR(transaction.amount)}
            </p>
            <p className="text-xs text-gray-500 mt-1">Saldo: {formatIDR(transaction.balance)}</p>
          </div>
        </div>

        <div className="absolute top-2 right-2 z-20">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }}
            className="p-2 rounded-full hover:bg-white/[0.1]"
          >
            <MoreHorizontalIcon className="w-4 h-4 text-gray-400" />
          </motion.button>
          
          {menuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-1 w-28 bg-gray-900/[0.8] backdrop-blur-xl border border-white/[0.1] rounded-lg shadow-xl"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <button onClick={(e) => { e.stopPropagation(); onEdit(transaction); setMenuOpen(false); }} className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/[0.1] rounded-t-lg">
                <EditIcon className="w-3 h-3 mr-2" /> Edit
              </button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(transaction.id); setMenuOpen(false); }} className="flex items-center w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/[0.1] rounded-b-lg">
                <TrashIcon className="w-3 h-3 mr-2" /> Hapus
              </button>
            </motion.div>
          )}
        </div>
      </GlassCard>
    </motion.li>
  );
};
