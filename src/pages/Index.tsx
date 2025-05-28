
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Plus,
  Eye,
  Calendar,
  Settings,
  LogOut,
  Bell,
  Search,
  FileText,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeSwitcher from '@/components/ThemeSwitcher';

const Index = () => {
  const { user, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    await signOut();
    toast({
      title: 'Signed out successfully',
      description: 'You have been logged out of your account.',
    });
    navigate('/login');
  };

  // Demo data
  const metrics = [
    {
      title: t('dashboard.totalRevenue'),
      value: 'KSh 125,430',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-950'
    },
    {
      title: t('dashboard.totalExpenses'),
      value: 'KSh 82,150',
      change: '+8.2%',
      trend: 'up',
      icon: CreditCard,
      color: 'text-red-600',
      bgColor: 'bg-red-50 dark:bg-red-950'
    },
    {
      title: t('dashboard.netProfit'),
      value: 'KSh 43,280',
      change: '+15.3%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-950'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+5.1%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-950'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Sale', description: 'Product Sale - Electronics', amount: '+KSh 2,500', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Expense', description: 'Office Supplies', amount: '-KSh 450', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'Sale', description: 'Service Payment', amount: '+KSh 1,200', time: '6 hours ago', status: 'completed' },
    { id: 4, type: 'Expense', description: 'Utilities Bill', amount: '-KSh 3,200', time: '1 day ago', status: 'pending' },
  ];

  const quickActions = [
    { label: t('dashboard.addTransaction'), icon: Plus, color: 'bg-blue-600 hover:bg-blue-700' },
    { label: 'Create Invoice', icon: FileText, color: 'bg-emerald-600 hover:bg-emerald-700' },
    { label: 'View Reports', icon: BarChart3, color: 'bg-purple-600 hover:bg-purple-700' },
    { label: 'Manage Customers', icon: Users, color: 'bg-orange-600 hover:bg-orange-700' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">
                  Bizkash
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {user?.user_metadata?.businessName || 'Business Dashboard'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="px-3 py-2 text-sm border border-slate-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <h2 className="text-2xl font-bold mb-2">
              Good morning, {user?.user_metadata?.firstName || 'Business Owner'}! 👋
            </h2>
            <p className="text-blue-100 opacity-90">
              Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm bg-white dark:bg-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {metric.value}
                      </p>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${metric.color} ${metric.bgColor}`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.change}
                      </div>
                    </div>
                    <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="lg:col-span-2 shadow-sm border-0 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-lg">
                {t('dashboard.transactions')}
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  {t('dashboard.viewAll')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${transaction.status === 'completed' ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-amber-100 dark:bg-amber-900'}`}>
                        <div className={`w-2 h-2 rounded-full ${transaction.status === 'completed' ? 'bg-emerald-600' : 'bg-amber-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white text-sm">
                          {transaction.description}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${transaction.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white dark:bg-slate-800">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button key={index} className={`w-full justify-start h-12 ${action.color} text-white shadow-sm`}>
                    <Icon className="w-4 h-4 mr-3" />
                    {action.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Additional Tools */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="shadow-sm border-0 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Schedule</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Manage appointments and deadlines</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <BarChart3 className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Analytics</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Detailed business insights</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-0 bg-white dark:bg-slate-800 hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Settings className="w-8 h-8 text-slate-600 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Settings</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Configure your account</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
