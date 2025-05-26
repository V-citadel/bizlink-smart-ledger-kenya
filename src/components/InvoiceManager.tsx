
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, Plus, Send, Download, Eye } from 'lucide-react';

interface Invoice {
  id: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  description: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  createdDate: Date;
}

interface InvoiceManagerProps {
  onClose: () => void;
}

const InvoiceManager: React.FC<InvoiceManagerProps> = ({ onClose }) => {
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '001',
      clientName: 'John Mwangi',
      clientEmail: 'john@example.com',
      amount: 25000,
      description: 'Huduma za uongozaji',
      status: 'sent',
      dueDate: new Date('2024-06-15'),
      createdDate: new Date('2024-05-20')
    },
    {
      id: '002',
      clientName: 'Grace Wanjiku',
      clientEmail: 'grace@example.com',
      amount: 15000,
      description: 'Mafunzo ya kompyuta',
      status: 'paid',
      dueDate: new Date('2024-06-10'),
      createdDate: new Date('2024-05-15')
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newInvoice, setNewInvoice] = useState({
    clientName: '',
    clientEmail: '',
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

  const getStatusBadge = (status: Invoice['status']) => {
    const statusConfig = {
      draft: { label: 'Rasimu', variant: 'secondary' as const },
      sent: { label: 'Imetumwa', variant: 'default' as const },
      paid: { label: 'Imelipwa', variant: 'outline' as const },
      overdue: { label: 'Imechelewa', variant: 'destructive' as const }
    };
    
    const config = statusConfig[status];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const createInvoice = () => {
    if (!newInvoice.clientName || !newInvoice.amount) return;

    const invoice: Invoice = {
      id: String(invoices.length + 1).padStart(3, '0'),
      clientName: newInvoice.clientName,
      clientEmail: newInvoice.clientEmail,
      amount: parseFloat(newInvoice.amount),
      description: newInvoice.description,
      status: 'draft',
      dueDate: new Date(newInvoice.dueDate),
      createdDate: new Date()
    };

    setInvoices(prev => [invoice, ...prev]);
    setNewInvoice({
      clientName: '',
      clientEmail: '',
      amount: '',
      description: '',
      dueDate: ''
    });
    setShowCreateForm(false);
  };

  const totalOutstanding = invoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center space-x-2">
            <FileText className="w-6 h-6 text-kenya-blue" />
            <span>Usimamizi wa Bili (Invoice Management)</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Button onClick={() => setShowCreateForm(true)} className="bg-kenya-green hover:bg-kenya-green/90">
              <Plus className="w-4 h-4 mr-2" />
              Tengeneza Bili
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-blue-700">Jumla ya Bili</p>
                  <p className="text-2xl font-bold text-blue-900">{invoices.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-yellow-700">Zinasubiri Malipo</p>
                  <p className="text-2xl font-bold text-yellow-900">{formatKES(totalOutstanding)}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="text-center">
                  <p className="text-sm text-green-700">Zimelipwa</p>
                  <p className="text-2xl font-bold text-green-900">{formatKES(totalPaid)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Create Invoice Form */}
          {showCreateForm && (
            <Card className="border-2 border-kenya-green">
              <CardHeader>
                <CardTitle>Tengeneza Bili Mpya</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Jina la Mteja</Label>
                    <Input
                      value={newInvoice.clientName}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, clientName: e.target.value }))}
                      placeholder="Mfano: John Doe"
                    />
                  </div>
                  <div>
                    <Label>Barua pepe ya Mteja</Label>
                    <Input
                      type="email"
                      value={newInvoice.clientEmail}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, clientEmail: e.target.value }))}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <Label>Kiasi (KES)</Label>
                    <Input
                      type="number"
                      value={newInvoice.amount}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="10000"
                    />
                  </div>
                  <div>
                    <Label>Tarehe ya Kulipa</Label>
                    <Input
                      type="date"
                      value={newInvoice.dueDate}
                      onChange={(e) => setNewInvoice(prev => ({ ...prev, dueDate: e.target.value }))}
                    />
                  </div>
                </div>
                <div>
                  <Label>Maelezo ya Huduma</Label>
                  <Textarea
                    value={newInvoice.description}
                    onChange={(e) => setNewInvoice(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Eleza huduma ulizotoa..."
                    rows={3}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={createInvoice} className="bg-kenya-green hover:bg-kenya-green/90">
                    Tengeneza Bili
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                    Ghairi
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Invoices List */}
          <Card>
            <CardHeader>
              <CardTitle>Bili Zote</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div>
                          <p className="font-medium">#{invoice.id} - {invoice.clientName}</p>
                          <p className="text-sm text-gray-600">{invoice.description}</p>
                          <p className="text-xs text-gray-500">
                            Ilitengenezwa: {invoice.createdDate.toLocaleDateString('sw-KE')} | 
                            Kulipa: {invoice.dueDate.toLocaleDateString('sw-KE')}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-bold text-lg">{formatKES(invoice.amount)}</p>
                        {getStatusBadge(invoice.status)}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                        {invoice.status === 'draft' && (
                          <Button size="sm" className="bg-kenya-blue hover:bg-kenya-blue/90">
                            <Send className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceManager;
