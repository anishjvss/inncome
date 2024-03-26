import { Component, OnInit } from '@angular/core';
import { Transaction } from '../transcation';
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})

export class TrackerComponent {
  // Properties
  currentType: 'income' | 'expense' | '' = '';
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  amount: number | null = null;
  date: Date | null = null;
  name: string = '';
  filterMonth: string = '';
  totalIncome: number = 0;
  totalExpense: number = 0;
  balance: number = 0;
  editMode: boolean = false;
  editId: number | null = null;
  filterYear: number = new Date().getFullYear();

  constructor(private sharedService: SharedService) {
    this.loadTransactions();
    this.calculateTotals();
  }

  loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    const storedYear = localStorage.getItem('filterYear');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
    }
    if (storedYear) {
      this.filterYear = Number(storedYear);
    }
    this.filterTransactionsByMonthAndYear(this.filterMonth, this.filterYear);
  }

  saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
    localStorage.setItem('filterYear', String(this.filterYear));
  }

  calculateTotals() {
    this.totalIncome = this.filteredTransactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    this.totalExpense = this.filteredTransactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0); // Add this line
    this.balance = this.totalIncome - this.totalExpense;
  }

  addTransaction() {
    if (!this.currentType || !this.amount || !this.date || !this.name) {
      alert('Please fill all fields');
      return;
    }
    const newTransaction: Transaction = {
      id: this.transactions.length + 1, // Temporary ID, will be reassigned later
      type: this.currentType,
      amount: Number(this.amount),
      date: this.date,
      name: this.name,
    };
    this.transactions.push(newTransaction);
    this.sortTransactions();
    this.saveTransactions();
    this.calculateTotals();
    this.filterTransactionsByMonthAndYear(this.filterMonth, this.filterYear);
    this.resetForm();
    this.sharedService.setTransactions(this.transactions);
  }

  editTransaction(id: number) {
    const transaction = this.transactions.find((t) => t.id === id);
    if (transaction) {
      this.currentType = transaction.type;
      this.amount = transaction.amount;
      this.date = transaction.date;
      this.name = transaction.name;
      this.editMode = true;
      this.editId = id;
    }
  }

  updateTransaction() {
    if (
      !this.currentType ||
      !this.amount ||
      !this.date ||
      !this.name ||
      !this.editId
    ) {
      alert('Please fill all fields');
      return;
    }
    const index = this.transactions.findIndex((t) => t.id === this.editId);
    this.transactions[index] = {
      id: this.editId,
      type: this.currentType,
      amount: Number(this.amount),
      date: this.date,
      name: this.name,
    };

    const filteredIndex = this.filteredTransactions.findIndex(
      (t) => t.id === this.editId
    );
    this.filteredTransactions[filteredIndex] = this.transactions[index];

    this.sortTransactions();
    this.saveTransactions();
    this.calculateTotals();
    this.resetForm();
    this.sharedService.setTransactions(this.transactions);
  }

  deleteTransaction(id: number) {
    this.transactions = this.transactions.filter((t) => t.id !== id);
    this.sortTransactions();
    this.saveTransactions();
    this.calculateTotals();
    this.filterTransactionsByMonthAndYear(this.filterMonth, this.filterYear);
    this.sharedService.setTransactions(this.transactions);
  }

  filterTransactionsByMonth(month: string) {
    if (month === '') {
      // If 'All records' is selected, show all transactions from the current year
      this.filteredTransactions = this.transactions.filter(
        (t) => new Date(t.date).getFullYear() === this.filterYear
      );
    } else {
      const monthNumber = parseInt(month, 10);
      this.filteredTransactions = this.transactions.filter(
        (t) =>
          new Date(t.date).getMonth() === monthNumber &&
          new Date(t.date).getFullYear() === this.filterYear
      );
    }
    this.calculateTotals();
  }

  sortTransactions() {
    this.transactions.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    this.transactions.forEach((transaction, index) => {
      transaction.id = this.transactions.length - index;
    });
  }

  resetForm() {
    this.currentType = '';
    this.amount = null;
    this.date = null;
    this.name = '';
    this.editMode = false;
    this.editId = null;
  }

  incrementYear() {
    this.filterYear++;
    this.filterTransactionsByMonthAndYear(this.filterMonth, this.filterYear);
  }

  decrementYear() {
    this.filterYear--;
    this.filterTransactionsByMonthAndYear(this.filterMonth, this.filterYear);
  }

  filterTransactionsByMonthAndYear(month: string, year: number) {
    if (month === '') {
      this.filteredTransactions = this.transactions.filter(
        (t) => new Date(t.date).getFullYear() === year
      );
    } else {
      const monthNumber = parseInt(month, 10);
      this.filteredTransactions = this.transactions.filter(
        (t) =>
          new Date(t.date).getMonth() === monthNumber &&
          new Date(t.date).getFullYear() === year
      );
    }
    this.calculateTotals();
  }
}
