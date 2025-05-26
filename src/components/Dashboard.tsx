
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Mic, Camera, Plus, BarChart3, Shield, FileText, Users, Bell, Settings, User, LogOut } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
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
  const { t } = useLanguage();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showAssistant, setShowAssistant] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);
  const [showInvoices, setShowInvoices] = useState(false);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 gradient-kenya rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">{t('dashboard.title')}</h1>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex space-x-6">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  {t('nav.dashboard')}
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  {t('nav.reports')}
                </Button>
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  {t('nav.invoices')}
                </Button>
              </nav>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher />
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button 
                onClick={() => setShowAssistant(true)}
                className="bg-kenya-green hover:bg-kenya-green/90 text-white"
                size="sm"
              >
                {t('nav.help')}
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <User className="w-4 h-4" />
                </Button>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Good morning, Business Owner! 👋</h2>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.income')}</p>
                  <p className="text-2xl font-bold text-green-600">{formatKES(totalIncome)}</p>
                  <p className="text-xs text-gray-500 mt-1">Money coming in</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.expenses')}</p>
                  <p className="text-2xl font-bold text-red-600">{formatKES(totalExpenses)}</p>
                  <p className="text-xs text-gray-500 mt-1">Money going out</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{t('dashboard.profit')}</p>
                  <p className={`text-2xl font-bold ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                    {formatKES(profit)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {profit >= 0 ? t('dashboard.youHaveProfit') : t('dashboard.youHaveLoss')}
                  </p>
                </div>
                <div className={`w-12 h-12 ${profit >= 0 ? 'bg-blue-100' : 'bg-red-100'} rounded-lg flex items-center justify-center`}>
                  <DollarSign className={`w-6 h-6 ${profit >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Business Tools */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Quick Add Transaction */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{t('dashboard.addTransaction')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <Button 
                  onClick={() => setShowVoiceInput(true)}
                  variant="outline"
                  className="h-20 flex flex-col items-center space-y-2 hover:bg-red-50 hover:border-red-300"
                >
                  <Mic className="w-6 h-6 text-red-600" />
                  <span className="text-sm font-medium">{t('dashboard.voice')}</span>
                </Button>

                <Button 
                  onClick={() => setShowPhotoCapture(true)}
                  variant="outline"
                  className="h-20 flex flex-col items-center space-y-2 hover:bg-green-50 hover:border-green-300"
                >
                  <Camera className="w-6 h-6 text-green-600" />
                  <span className="text-sm font-medium">{t('dashboard.photo')}</span>
                </Button>

                <Button 
                  onClick={() => setShowTransactionForm(true)}
                  variant="outline"
                  className="h-20 flex flex-col items-center space-y-2 hover:bg-blue-50 hover:border-blue-300"
                >
                  <Plus className="w-6 h-6 text-blue-600" />
                  <span className="text-sm font-medium">{t('dashboard.manual')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Business Tools */}
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">{t('dashboard.businessTools')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={() => setShowReports(true)}
                  variant="outline"
                  className="h-16 flex flex-col items-center space-y-2 hover:bg-blue-50"
                >
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="text-sm">{t('nav.reports')}</span>
                </Button>

                <Button 
                  onClick={() => setShowInvoices(true)}
                  variant="outline"
                  className="h-16 flex flex-col items-center space-y-2 hover:bg-green-50"
                >
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm">{t('nav.invoices')}</span>
                </Button>

                <Button 
                  variant="outline"
                  className="h-16 flex flex-col items-center space-y-2 hover:bg-purple-50"
                >
                  <Users className="w-5 h-5 text-purple-600" />
                  <span className="text-sm">Customers</span>
                </Button>

                <Button 
                  onClick={() => setShowSecurity(true)}
                  variant="outline"
                  className="h-16 flex flex-col items-center space-y-2 hover:bg-red-50"
                >
                  <Shield className="w-5 h-5 text-red-600" />
                  <span className="text-sm">{t('nav.security')}</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-white shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">{t('dashboard.recentTransactions')}</CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </CardHeader>
          <CardContent>
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
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
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatKES(transaction.amount)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.timestamp.toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{t('dashboard.noTransactions')}</h3>
                <p className="text-gray-600 mb-4">{t('dashboard.startAdding')}</p>
                <Button 
                  onClick={() => setShowTransactionForm(true)}
                  className="bg-kenya-blue hover:bg-kenya-blue/90"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Transaction
                </Button>
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
