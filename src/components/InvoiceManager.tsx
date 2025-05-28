
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { FileText, X, Plus, Download, Eye, Edit } from 'lucide-react';

interface InvoiceManagerProps {
  onClose: () => void;
}

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  date: Date;
  dueDate: Date;
}

const InvoiceManager: React.FC<InvoiceManagerProps> = ({ onClose }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      number: 'INV-001',
      client: 'John Doe Enterprises',
      amount: 50000,
      status: 'paid',
      date: new Date('2024-12-01'),
      dueDate: new Date('2024-12-15')
    },
    {
      id: '2',
      number: 'INV-002',
      client: 'ABC Corp',
      amount: 75000,
      status: 'sent',
      date: new Date('2024-12-10'),
      dueDate: new Date('2024-12-25')
    },
    {
      id: '3',
      number: 'INV-003',
      client: 'XYZ Limited',
      amount: 25000,
      status: 'overdue',
      date: new Date('2024-11-20'),
      dueDate: new Date('2024-12-05')
    }
  ]);

  const [showNewInvoice, setShowNewInvoice] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    client: '',
    amount: '',
    description: '',
    dueDate: ''
  });

  const formatKES = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'sent':
        return 'bg-blue-100 text-blue-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    
    const invoice: Invoice = {
      id: Date.now().toString(),
      number: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      client: newInvoice.client,
      amount: parseFloat(newInvoice.amount),
      status: 'draft',
      date: new Date(),
      dueDate: new Date(newInvoice.dueDate)
    };

    setInvoices(prev => [invoice, ...prev]);
    setNewInvoice({ client: '', amount: '', description: '', dueDate: '' });
    setShowNewInvoice(false);
  };

  const totalAmount = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
  const outstandingAmount = totalAmount - paidAmount;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[600px] bg-white flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <FileText className="w-5 h-5 text-green-600" />
            <span>Invoice Manager</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              onClick={() => setShowNewInvoice(true)}
              className="bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Invoice
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium text-blue-600">Total Invoiced</p>
                  <p className="text-2xl font-bold text-blue-700">{formatKES(totalAmount)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium text-green-600">Amount Paid</p>
                  <p className="text-2xl font-bold text-green-700">{formatKES(paidAmount)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-4">
                <div>
                  <p className="text-sm font-medium text-orange-600">Outstanding</p>
                  <p className="text-2xl font-bold text-orange-700">{formatKES(outstandingAmount)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* New Invoice Form */}
          {showNewInvoice && (
            <Card className="mb-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-base">Create New Invoice</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCreateInvoice} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="client">Client Name</Label>
                      <Input
                        id="client"
                        value={newInvoice.client}
                        onChange={(e) => setNewInvoice(prev => ({ ...prev, client: e.target.value }))}
                        placeholder="Enter client name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount">Amount (KES)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newInvoice.amount}
                        onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={newInvoice.description}
                        onChange={(e) => setNewInvoice(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Services provided..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="dueDate">Due Date</Label>
                      <Input
                        id="dueDate"
                        type="date"
                        value={newInvoice.dueDate}
                        onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button type="submit" className="bg-green-600 hover:bg-green-700">
                      Create Invoice
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setShowNewInvoice(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Invoices List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">All Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              {invoices.length > 0 ? (
                <div className="space-y-3">
                  {invoices.map((invoice) => (
                    <div 
                      key={invoice.id}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{invoice.number}</p>
                          <p className="text-sm text-gray-600">{invoice.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatKES(invoice.amount)}</p>
                          <p className="text-sm text-gray-600">
                            Due: {invoice.dueDate.toLocaleDateString()}
                          </p>
                        </div>

                        <Badge className={`${getStatusColor(invoice.status)} border-0`}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>

                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices yet</h3>
                  <p className="text-gray-600 mb-4">Create your first invoice to get started</p>
                  <Button 
                    onClick={() => setShowNewInvoice(true)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Invoice
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceManager;
