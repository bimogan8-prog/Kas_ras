
export interface Transaction {
  id: string;
  date: string; // ISO 8601 format
  description: string;
  category: string;
  type: 'debit' | 'credit';
  amount: number;
  balance: number;
  buktiUrl?: string; // URL bukti transaksi dari Cloudinary
}

export type TransactionData = Omit<Transaction, 'id' | 'balance'>;

export type FilterType = 'Semua' | 'Debit' | 'Kredit';

export const incomeCategories = ['Setoran', 'Jasa', 'Lain-lain'];
export const expenseCategories = ['Operasional', 'Gaji', 'Perlengkapan', 'Sewa', 'Lain-lain'];
