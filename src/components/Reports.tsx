
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, X, TrendingUp, TrendingDown, Calendar, DollarSign } from 'lucide-react';

interface ReportsProps {
  onClose: () => void;
  transactions: Array<{
    id: string;
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    timestamp: Date;
  }>;
}

const Reports: React.FC<ReportsProps> = ({ onClose, transactions }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');

  const filterTransactionsByPeriod = (period: string) => {
    const now = new Date();
    const filterDate = new Date();
    
    switch (period) {
      case '7days':
        filterDate.setDate(now.getDate() - 7);
        break;
      case '30days':
        filterDate.setDate(now.getDate() - 30);
        break;
      case '90days':
        filterDate.setDate(now.getDate() - 90);
        break;
      default:
        return transactions;
    }
    
    return transactions.filter(t => t.timestamp >= filterDate);
  };

  const filteredTransactions = filterTransactionsByPeriod(selectedPeriod);
  
  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const netProfit = totalIncome - totalExpenses;

  // Category breakdown
  const expensesByCategory = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const incomeByCategory = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const periods = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
    { value: 'all', label: 'All Time' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl h-[600px] bg-white overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            <span>Business Reports</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="p-6 overflow-y-auto">
          {/* Period Selector */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {periods.map(period => (
                <Button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  variant={selectedPeriod === period.value ? "default" : "outline"}
                  size="sm"
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Total Income</p>
                    <p className="text-2xl font-bold text-green-700">{formatKES(totalIncome)}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-600">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-700">{formatKES(totalExpenses)}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card className={`${netProfit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-sm font-medium ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                      Net {netProfit >= 0 ? 'Profit' : 'Loss'}
                    </p>
                    <p className={`text-2xl font-bold ${netProfit >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>
                      {formatKES(Math.abs(netProfit))}
                    </p>
                  </div>
                  <DollarSign className={`w-8 h-8 ${netProfit >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Category Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expenses by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Expenses by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(expensesByCategory).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(expensesByCategory)
                      .sort(([,a], [,b]) => b - a)
                      .map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <span className="text-sm font-medium">{category}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{formatKES(amount)}</p>
                            <p className="text-xs text-gray-500">
                              {totalExpenses > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No expenses found</p>
                )}
              </CardContent>
            </Card>

            {/* Income by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Income by Category</CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(incomeByCategory).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(incomeByCategory)
                      .sort(([,a], [,b]) => b - a)
                      .map(([category, amount]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-sm font-medium">{category}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold">{formatKES(amount)}</p>
                            <p className="text-xs text-gray-500">
                              {totalIncome > 0 ? ((amount / totalIncome) * 100).toFixed(1) : 0}%
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No income found</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions Summary */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Transaction Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{filteredTransactions.length}</p>
                  <p className="text-sm text-gray-600">Total Transactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">
                    {filteredTransactions.filter(t => t.type === 'income').length}
                  </p>
                  <p className="text-sm text-gray-600">Income Transactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-red-600">
                    {filteredTransactions.filter(t => t.type === 'expense').length}
                  </p>
                  <p className="text-sm text-gray-600">Expense Transactions</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-600">
                    {formatKES(filteredTransactions.length > 0 ? 
                      filteredTransactions.reduce((sum, t) => sum + t.amount, 0) / filteredTransactions.length : 0
                    )}
                  </p>
                  <p className="text-sm text-gray-600">Average Amount</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
