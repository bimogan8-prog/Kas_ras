
import React, { useState, useMemo, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Dashboard } from './components/Dashboard';
import { TransactionList } from './components/TransactionList';
import { FilterBar } from './components/FilterBar';
import { TransactionModal } from './components/TransactionModal';
import { PlusIcon } from './components/icons/PlusIcon';
import { useTransactions } from './hooks/useTransactions';
// FIX: Import `TransactionData` to resolve missing type error.
import { Transaction, FilterType, TransactionData } from './types';
import { MonthYearPickerModal } from './components/MonthYearPickerModal';
import { Sidebar } from './components/Sidebar';
import { BottomNavBar } from './components/BottomNavBar';
import { TransactionTable } from './components/TransactionTable';
import { ImagePreviewModal } from './components/ImagePreviewModal';

export default function App() {
  const {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useTransactions();

  const [filter, setFilter] = useState<FilterType>('Semua');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  
  const [isMonthYearPickerOpen, setIsMonthYearPickerOpen] = useState(false);
  const [dateFilter, setDateFilter] = useState<{ month: number; year: number } | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const openAddModal = useCallback(() => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  }, []);

  const handleSave = useCallback((transactionData: TransactionData, id?: string) => {
    if (id) {
      updateTransaction(id, transactionData);
    } else {
      addTransaction(transactionData);
    }
    closeModal();
  }, [addTransaction, updateTransaction, closeModal]);
  
  const handleDelete = useCallback((id: string) => {
    deleteTransaction(id);
  }, [deleteTransaction]);

  const filteredTransactions = useMemo(() => {
    let filtered = [...transactions].reverse(); // Show newest first

    if (dateFilter) {
      filtered = filtered.filter(t => {
        const txDate = new Date(t.date);
        return txDate.getMonth() === dateFilter.month && txDate.getFullYear() === dateFilter.year;
      });
    }

    if (filter === 'Semua') {
      return filtered;
    }
    const type = filter === 'Debit' ? 'debit' : 'credit';
    return filtered.filter((t) => t.type === type);
  }, [transactions, filter, dateFilter]);

  const totalBalance = useMemo(() => {
    return transactions.length > 0 ? transactions[transactions.length - 1].balance : 0;
  }, [transactions]);

  const handleMonthYearSelect = useCallback((month: number, year: number) => {
    setDateFilter({ month, year });
    setIsMonthYearPickerOpen(false);
  }, []);

  const clearDateFilter = useCallback(() => {
    setDateFilter(null);
  }, []);

  const openImagePreview = useCallback((url: string) => {
    setPreviewImageUrl(url);
  }, []);

  return (
    <div className="w-full min-h-screen max-w-screen-2xl mx-auto lg:flex bg-slate-900">
      <Sidebar />
      
      <main className="flex-1 w-full p-4 md:p-8 lg:max-w-6xl lg:mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-6">Dashboard</h1>
        <Dashboard totalBalance={totalBalance} />
        
        <div className="mt-8">
          <h2 className="text-xl lg:text-2xl font-bold text-white mb-4">Riwayat Transaksi</h2>
          <FilterBar 
            activeFilter={filter} 
            onFilterChange={setFilter} 
            onDateFilterClick={() => setIsMonthYearPickerOpen(true)}
            activeDateFilter={dateFilter}
            clearDateFilter={clearDateFilter}
          />

          <div className="mt-4 lg:hidden">
            <TransactionList
              transactions={filteredTransactions}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onPreviewImage={openImagePreview}
            />
          </div>
          <div className="mt-4 hidden lg:block">
            <TransactionTable
              transactions={filteredTransactions}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onPreviewImage={openImagePreview}
            />
          </div>
        </div>
      </main>

      <BottomNavBar onAddClick={openAddModal} />
      
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={openAddModal}
        className="hidden lg:flex fixed bottom-8 right-8 bg-indigo-500 text-white rounded-full p-4 shadow-lg shadow-indigo-500/30 z-40 items-center justify-center"
        aria-label="Tambah Transaksi"
      >
        <PlusIcon className="w-6 h-6" />
      </motion.button>
      
      <AnimatePresence>
        {isModalOpen && (
          <TransactionModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSave={handleSave}
            transaction={editingTransaction}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMonthYearPickerOpen && (
          <MonthYearPickerModal
            isOpen={isMonthYearPickerOpen}
            onClose={() => setIsMonthYearPickerOpen(false)}
            onSelect={handleMonthYearSelect}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {previewImageUrl && (
          <ImagePreviewModal
            imageUrl={previewImageUrl}
            onClose={() => setPreviewImageUrl(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
