import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Mic, Camera, Plus, BarChart3, Shield, FileText, Users } from 'lucide-react';
import VoiceInput from './VoiceInput';
import PhotoCapture from './PhotoCapture';
import TransactionForm from './TransactionForm';
import Assistant from './Assistant';
import Reports from './Reports';
import SecuritySettings from './SecuritySettings';
import InvoiceManager from './InvoiceManager';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  timestamp: Date;
  source?: 'voice' | 'photo' | 'manual';
}

const Dashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showAssistant, setShowAssistant] = useState(true);

  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const profit = totalIncome - totalExpenses;

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'timestamp'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      timestamp: new Date()
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const recentTransactions = transactions.slice(0, 5);

  const [showReports, setShowReports] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-orange-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-kenya rounded-xl flex items-center justify-center animate-bounce-in">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Biz Link</h1>
                <p className="text-sm text-gray-600">Biashara Smart Tracker</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button 
                onClick={() => setShowSecurity(true)}
                variant="outline"
                size="sm"
                className="hidden md:flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Usalama</span>
              </Button>
              <Button 
                onClick={() => setShowAssistant(true)}
                className="bg-kenya-green hover:bg-kenya-green/90 text-white animate-pulse-glow"
              >
                Msaada (Help)
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="animate-slide-up border-green-200 bg-gradient-to-br from-green-50 to-green-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-800">Mapato (Income)</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">{formatKES(totalIncome)}</div>
              <p className="text-xs text-green-700 mt-1">
                Pesa inayoingia biashara
              </p>
            </CardContent>
          </Card>

          <Card className="animate-slide-up border-red-200 bg-gradient-to-br from-red-50 to-red-100" style={{ animationDelay: '0.1s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-red-800">Matumizi (Expenses)</CardTitle>
              <TrendingDown className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-900">{formatKES(totalExpenses)}</div>
              <p className="text-xs text-red-700 mt-1">
                Pesa inayotoka biashara
              </p>
            </CardContent>
          </Card>

          <Card className={`animate-slide-up border-blue-200 ${profit >= 0 ? 'gradient-profit' : 'gradient-loss'}`} style={{ animationDelay: '0.2s' }}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white">Faida (Profit)</CardTitle>
              <DollarSign className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{formatKES(profit)}</div>
              <p className="text-xs text-white/90 mt-1">
                {profit >= 0 ? 'Una faida!' : 'Una hasara'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Ongeza Shughuli (Add Transaction)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowVoiceInput(true)}
                  className="bg-kenya-red hover:bg-kenya-red/90 text-white p-6 h-auto flex flex-col items-center space-y-2 animate-float"
                >
                  <Mic className="w-8 h-8" />
                  <span>Sauti (Voice)</span>
                  <span className="text-xs opacity-90">Ongea kwa Kiswahili au Kingereza</span>
                </Button>

                <Button 
                  onClick={() => setShowPhotoCapture(true)}
                  className="bg-kenya-green hover:bg-kenya-green/90 text-white p-6 h-auto flex flex-col items-center space-y-2 animate-float"
                  style={{ animationDelay: '0.5s' }}
                >
                  <Camera className="w-8 h-8" />
                  <span>Picha (Photo)</span>
                  <span className="text-xs opacity-90">Piga picha ya risiti</span>
                </Button>

                <Button 
                  onClick={() => setShowTransactionForm(true)}
                  className="bg-kenya-blue hover:bg-kenya-blue/90 text-white p-6 h-auto flex flex-col items-center space-y-2 animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <Plus className="w-8 h-8" />
                  <span>Kawaida (Manual)</span>
                  <span className="text-xs opacity-90">Andika kwa mkono</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Business Management Tools */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900">Zana za Biashara (Business Tools)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setShowReports(true)}
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  <span className="text-sm">Ripoti</span>
                </Button>

                <Button 
                  onClick={() => setShowInvoices(true)}
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
                >
                  <FileText className="w-6 h-6 text-green-600" />
                  <span className="text-sm">Bili</span>
                </Button>

                <Button 
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-purple-50 hover:border-purple-300"
                >
                  <Users className="w-6 h-6 text-purple-600" />
                  <span className="text-sm">Wateja</span>
                </Button>

                <Button 
                  onClick={() => setShowSecurity(true)}
                  variant="outline"
                  className="p-4 h-auto flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300"
                >
                  <Shield className="w-6 h-6 text-red-600" />
                  <span className="text-sm">Usalama</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="animate-fade-in">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Shughuli za Hivi Karibuni</CardTitle>
            <BarChart3 className="w-5 h-5 text-gray-600" />
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.type === 'income' ? 
                          <TrendingUp className="w-5 h-5 text-green-600" /> : 
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <p className="text-sm text-gray-600">{transaction.category}</p>
                          {transaction.source && (
                            <Badge variant="outline" className="text-xs">
                              {transaction.source}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatKES(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.timestamp.toLocaleTimeString('sw-KE', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Hakuna shughuli bado</p>
                <p className="text-sm text-gray-500">Anza kuongeza mapato na matumizi yako</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showVoiceInput && (
        <VoiceInput 
          onClose={() => setShowVoiceInput(false)}
          onTransactionAdd={addTransaction}
        />
      )}

      {showPhotoCapture && (
        <PhotoCapture 
          onClose={() => setShowPhotoCapture(false)}
          onTransactionAdd={addTransaction}
        />
      )}

      {showTransactionForm && (
        <TransactionForm 
          onClose={() => setShowTransactionForm(false)}
          onTransactionAdd={addTransaction}
        />
      )}

      {showAssistant && (
        <Assistant 
          onClose={() => setShowAssistant(false)}
          transactions={transactions}
        />
      )}

      {showReports && (
        <Reports 
          onClose={() => setShowReports(false)}
          transactions={transactions}
        />
      )}

      {showSecurity && (
        <SecuritySettings 
          onClose={() => setShowSecurity(false)}
        />
      )}

      {showInvoices && (
        <InvoiceManager 
          onClose={() => setShowInvoices(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
