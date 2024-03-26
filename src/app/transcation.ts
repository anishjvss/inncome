export interface Transaction {
    id: number;
    type: 'income' | 'expense';
    name: string;
    amount: number;
    date: Date;
  }
  