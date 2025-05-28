
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
  Search
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
      color: 'text-emerald-600'
    },
    {
      title: t('dashboard.totalExpenses'),
      value: 'KSh 82,150',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.netProfit'),
      value: 'KSh 43,280',
      change: '+15.3%',
      trend: 'up',
      icon: BarChart3,
      color: 'text-purple-600'
    },
    {
      title: 'Active Customers',
      value: '1,234',
      change: '+5.1%',
      trend: 'up',
      icon: Users,
      color: 'text-orange-600'
    }
  ];

  const recentTransactions = [
    { id: 1, type: 'Sale', description: 'Product Sale - Electronics', amount: '+KSh 2,500', time: '2 hours ago', status: 'completed' },
    { id: 2, type: 'Expense', description: 'Office Supplies', amount: '-KSh 450', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'Sale', description: 'Service Payment', amount: '+KSh 1,200', time: '6 hours ago', status: 'completed' },
    { id: 4, type: 'Expense', description: 'Utilities Bill', amount: '-KSh 3,200', time: '1 day ago', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/a5d86a0b-8e34-4e06-85a5-6de4043457b9.png" 
                alt="Bizkash Logo" 
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {t('dashboard.welcome')}
                </h1>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {user?.user_metadata?.businessName || 'Your Business Dashboard'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2">
                <Search className="w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search transactions..." 
                  className="px-3 py-1 text-sm border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <LanguageSwitcher />
              <ThemeSwitcher />
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                {t('dashboard.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-6 text-white">
            <h2 className="text-2xl font-bold mb-2">
              Welcome back, {user?.user_metadata?.firstName || 'Demo User'}!
            </h2>
            <p className="text-blue-100">
              Here's what's happening with your business today.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {metric.title}
                      </p>
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {metric.value}
                      </p>
                      <p className={`text-sm ${metric.color} flex items-center mt-1`}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {metric.change}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full bg-slate-100 dark:bg-slate-700`}>
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {t('dashboard.transactions')}
                <Button size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  {t('dashboard.viewAll')}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${transaction.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {transaction.time}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.amount.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                        {transaction.amount}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                {t('dashboard.addTransaction')}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                New Sale
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="w-4 h-4 mr-2" />
                View Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
