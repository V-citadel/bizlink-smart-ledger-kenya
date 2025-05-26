
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Download, Filter, Calendar, TrendingUp, TrendingDown, DollarSign, Users } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  timestamp: Date;
  source?: 'voice' | 'photo' | 'manual';
}

interface ReportsProps {
  transactions: Transaction[];
  onClose: () => void;
}

const Reports: React.FC<ReportsProps> = ({ transactions, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate metrics
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
  const profit = totalIncome - totalExpenses;
  const profitMargin = totalIncome > 0 ? (profit / totalIncome) * 100 : 0;

  // Category breakdown
  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = { income: 0, expense: 0 };
    }
    acc[transaction.category][transaction.type] += transaction.amount;
    return acc;
  }, {} as Record<string, { income: number; expense: number }>);

  const exportToCSV = () => {
    const headers = ['Tarehe', 'Aina', 'Kiasi', 'Maelezo', 'Jamii', 'Chanzo'];
    const csvData = transactions.map(t => [
      t.timestamp.toLocaleDateString('sw-KE'),
      t.type === 'income' ? 'Mapato' : 'Matumizi',
      t.amount,
      t.description,
      t.category,
      t.source || 'manual'
    ]);
    
    const csvContent = [headers, ...csvData]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `biz-link-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center space-x-2">
            <BarChart3 className="w-6 h-6 text-kenya-blue" />
            <span>Ripoti za Biashara (Business Reports)</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Muhtasari</TabsTrigger>
              <TabsTrigger value="profit-loss">Faida & Hasara</TabsTrigger>
              <TabsTrigger value="categories">Makundi</TabsTrigger>
              <TabsTrigger value="transactions">Shughuli</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="text-sm text-green-700">Jumla ya Mapato</p>
                        <p className="text-lg font-bold text-green-900">{formatKES(totalIncome)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 border-red-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <TrendingDown className="w-5 h-5 text-red-600" />
                      <div>
                        <p className="text-sm text-red-700">Jumla ya Matumizi</p>
                        <p className="text-lg font-bold text-red-900">{formatKES(totalExpenses)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`${profit >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className={`w-5 h-5 ${profit >= 0 ? 'text-blue-600' : 'text-orange-600'}`} />
                      <div>
                        <p className={`text-sm ${profit >= 0 ? 'text-blue-700' : 'text-orange-700'}`}>Faida Halisi</p>
                        <p className={`text-lg font-bold ${profit >= 0 ? 'text-blue-900' : 'text-orange-900'}`}>
                          {formatKES(profit)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-purple-700">Kiwango cha Faida</p>
                        <p className="text-lg font-bold text-purple-900">{profitMargin.toFixed(1)}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="profit-loss">
              <Card>
                <CardHeader>
                  <CardTitle>Hesabu ya Faida na Hasara</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Mapato Yote</span>
                      <span className="text-green-600 font-bold">{formatKES(totalIncome)}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="font-medium">Matumizi Yote</span>
                      <span className="text-red-600 font-bold">({formatKES(totalExpenses)})</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                      <span className="font-bold text-lg">Faida/Hasara Halisi</span>
                      <span className={`font-bold text-xl ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatKES(profit)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Uchambuzi wa Makundi</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Jamii</TableHead>
                        <TableHead>Mapato</TableHead>
                        <TableHead>Matumizi</TableHead>
                        <TableHead>Faida</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {Object.entries(categoryBreakdown).map(([category, data]) => (
                        <TableRow key={category}>
                          <TableCell className="font-medium">{category}</TableCell>
                          <TableCell className="text-green-600">{formatKES(data.income)}</TableCell>
                          <TableCell className="text-red-600">{formatKES(data.expense)}</TableCell>
                          <TableCell className={data.income - data.expense >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {formatKES(data.income - data.expense)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions">
              <Card>
                <CardHeader>
                  <CardTitle>Shughuli Zote</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tarehe</TableHead>
                        <TableHead>Maelezo</TableHead>
                        <TableHead>Jamii</TableHead>
                        <TableHead>Aina</TableHead>
                        <TableHead>Kiasi</TableHead>
                        <TableHead>Chanzo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.slice(0, 50).map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            {transaction.timestamp.toLocaleDateString('sw-KE')}
                          </TableCell>
                          <TableCell>{transaction.description}</TableCell>
                          <TableCell>{transaction.category}</TableCell>
                          <TableCell>
                            <Badge variant={transaction.type === 'income' ? 'default' : 'destructive'}>
                              {transaction.type === 'income' ? 'Mapato' : 'Matumizi'}
                            </Badge>
                          </TableCell>
                          <TableCell className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                            {transaction.type === 'income' ? '+' : '-'}{formatKES(transaction.amount)}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{transaction.source || 'manual'}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
