
import { useState, useCallback, useEffect } from 'react';
import { ref, onValue, push, set, remove, serverTimestamp, query, orderByChild } from 'firebase/database';
import { db } from '../firebase';
import { Transaction, TransactionData } from '../types';

const calculateRunningBalances = (transactions: Transaction[]): Transaction[] => {
    const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    let currentBalance = 0;
    return sorted.map(tx => {
        if (tx.type === 'debit') {
            currentBalance += tx.amount;
        } else {
            currentBalance -= tx.amount;
        }
        return { ...tx, balance: currentBalance };
    });
};

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const transactionsRef = ref(db, 'transactions');

  useEffect(() => {
    // Mengurutkan data dari Firebase berdasarkan tanggal
    const transactionsQuery = query(transactionsRef, orderByChild('date'));
    
    const unsubscribe = onValue(transactionsQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const transactionsList: Transaction[] = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const transactionsWithBalances = calculateRunningBalances(transactionsList);
        setTransactions(transactionsWithBalances);
      } else {
        setTransactions([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const addTransaction = useCallback(async (transactionData: TransactionData) => {
    const newTransactionRef = push(transactionsRef);
    const dataToSave = { ...transactionData };
    // Firebase tidak mengizinkan nilai `undefined`. Hapus properti jika tidak ada URL.
    if (dataToSave.buktiUrl === undefined) {
      delete dataToSave.buktiUrl;
    }
    await set(newTransactionRef, dataToSave);
  }, []);

  const updateTransaction = useCallback(async (id: string, updates: TransactionData) => {
    const transactionToUpdateRef = ref(db, `transactions/${id}`);
    const dataToSave = { ...updates };
    // Firebase tidak mengizinkan nilai `undefined`. Hapus properti jika tidak ada URL.
    if (dataToSave.buktiUrl === undefined) {
      delete dataToSave.buktiUrl;
    }
    await set(transactionToUpdateRef, dataToSave);
  }, []);

  const deleteTransaction = useCallback(async (id: string) => {
    const transactionToDeleteRef = ref(db, `transactions/${id}`);
    await remove(transactionToDeleteRef);
    // Note: Cloudinary image deletion is not handled here to keep it simple.
    // For a production app, you would need a backend function to securely delete images.
  }, []);

  return { transactions, addTransaction, updateTransaction, deleteTransaction };
};
