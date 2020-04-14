import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeValue = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((a, b) => a + b.value, 0);

    const outcomeValue = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((a, b) => a + b.value, 0);

    const total = incomeValue - outcomeValue;

    const balance: Balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
