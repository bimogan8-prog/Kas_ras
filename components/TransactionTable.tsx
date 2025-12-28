
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Transaction } from '../types';
import { formatIDR, formatDate } from '../utils/formatters';
import { GlassCard } from './ui/GlassCard';
import { MoreHorizontalIcon } from './icons/MoreHorizontalIcon';
import { EditIcon } from './icons/EditIcon';
import { TrashIcon } from './icons/TrashIcon';
import { PaperclipIcon } from './icons/PaperclipIcon';

interface TransactionTableProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  onPreviewImage: (url: string) => void;
}

const TableRow: React.FC<{ transaction: Transaction, onEdit: (transaction: Transaction) => void, onDelete: (id: string) => void, onPreviewImage: (url: string) => void }> = ({ transaction, onEdit, onDelete, onPreviewImage }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const isDebit = transaction.type === 'debit';
    const hasAttachment = !!transaction.buktiUrl;

    const handleRowClick = () => {
        if(hasAttachment) {
            onPreviewImage(transaction.buktiUrl!);
        }
    };

    return (
        <motion.tr 
            layout 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={`border-b border-white/10 hover:bg-white/5 transition-colors ${hasAttachment ? 'cursor-pointer' : ''}`}
            onClick={handleRowClick}
        >
            <td className="px-6 py-4">
                <div className="font-medium text-white">{formatDate(transaction.date)}</div>
                <div className="text-gray-400 text-xs">{transaction.category}</div>
            </td>
            <td className="px-6 py-4 font-medium text-gray-300">
                <div className="flex items-center gap-2">
                    {hasAttachment && <PaperclipIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />}
                    <span>{transaction.description}</span>
                </div>
            </td>
            <td className={`px-6 py-4 text-right font-semibold ${isDebit ? 'text-green-400' : 'text-red-400'}`}>
                {isDebit ? '+' : '-'} {formatIDR(transaction.amount)}
            </td>
            <td className="px-6 py-4 text-right text-gray-400">{formatIDR(transaction.balance)}</td>
            <td className="px-6 py-4 text-right">
                <div className="relative inline-block">
                    <motion.button whileTap={{scale:0.9}} onClick={(e) => { e.stopPropagation(); setMenuOpen(!menuOpen); }} className="p-2 rounded-full hover:bg-white/10">
                        <MoreHorizontalIcon className="w-4 h-4"/>
                    </motion.button>
                    <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-1 w-28 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl z-20"
                            onMouseLeave={() => setMenuOpen(false)}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button onClick={(e) => { e.stopPropagation(); onEdit(transaction); setMenuOpen(false); }} className="flex items-center w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-white/10 rounded-t-lg">
                                <EditIcon className="w-3 h-3 mr-2" /> Edit
                            </button>
                            <button onClick={(e) => { e.stopPropagation(); onDelete(transaction.id); setMenuOpen(false); }} className="flex items-center w-full px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10 rounded-b-lg">
                                <TrashIcon className="w-3 h-3 mr-2" /> Hapus
                            </button>
                        </motion.div>
                    )}
                    </AnimatePresence>
                </div>
            </td>
        </motion.tr>
    );
};

export const TransactionTable: React.FC<TransactionTableProps> = ({ transactions, onEdit, onDelete, onPreviewImage }) => {
  return (
    <GlassCard>
        <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-sm text-left">
                <thead className="border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider">
                    <tr>
                        <th scope="col" className="px-6 py-3 font-medium">Tanggal / Kategori</th>
                        <th scope="col" className="px-6 py-3 font-medium">Deskripsi</th>
                        <th scope="col" className="px-6 py-3 font-medium text-right">Jumlah</th>
                        <th scope="col" className="px-6 py-3 font-medium text-right">Saldo</th>
                        <th scope="col" className="px-6 py-3 font-medium"></th>
                    </tr>
                </thead>
                <motion.tbody>
                    <AnimatePresence initial={false}>
                        {transactions.map(tx => (
                            <TableRow key={tx.id} transaction={tx} onEdit={onEdit} onDelete={onDelete} onPreviewImage={onPreviewImage} />
                        ))}
                    </AnimatePresence>
                </motion.tbody>
            </table>
        </div>
    </GlassCard>
  );
};
