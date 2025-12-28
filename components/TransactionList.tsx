
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Transaction } from '../types';
import { TransactionItem } from './TransactionItem';
import { FileTextIcon } from './icons/FileTextIcon';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onPreviewImage: (url: string) => void;
}

const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const TransactionList: React.FC<TransactionListProps> = ({ transactions, onEdit, onDelete, onPreviewImage }) => {
  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-20 lg:mt-28">
        <FileTextIcon className="w-12 h-12 mb-4" />
        <h3 className="font-semibold text-lg">Tidak Ada Transaksi</h3>
        <p className="max-w-xs text-sm">Belum ada data transaksi yang cocok dengan filter Anda.</p>
      </div>
    );
  }

  return (
    <motion.ul
      variants={listVariants}
      initial="hidden"
      animate="visible"
      className="space-y-3"
    >
      <AnimatePresence>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onEdit={onEdit}
            onDelete={onDelete}
            onPreviewImage={onPreviewImage}
          />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
};
