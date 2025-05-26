
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X, Calculator } from 'lucide-react';

interface TransactionFormProps {
  onClose: () => void;
  onTransactionAdd: (transaction: {
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    source: 'manual';
  }) => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ onClose, onTransactionAdd }) => {
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: 'Mingine'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories = [
    'Biashara',
    'Chakula',
    'Usafiri',
    'Nyumba',
    'Simu',
    'Nguo',
    'Afya',
    'Elimu',
    'Mingine'
  ];

  const businessTemplates = {
    income: [
      { desc: 'Uuzaji wa bidhaa', category: 'Biashara' },
      { desc: 'Huduma iliyotolewa', category: 'Biashara' },
      { desc: 'Faida ya siku', category: 'Biashara' }
    ],
    expense: [
      { desc: 'Ununuzi wa stock', category: 'Biashara' },
      { desc: 'Kodi ya duka', category: 'Nyumba' },
      { desc: 'Usafiri wa biashara', category: 'Usafiri' },
      { desc: 'Chakula cha mchana', category: 'Chakula' }
    ]
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Weka kiasi sahihi';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Andika maelezo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onTransactionAdd({
        type: formData.type,
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        category: formData.category,
        source: 'manual'
      });
      onClose();
    }
  };

  const useTemplate = (template: { desc: string; category: string }) => {
    setFormData(prev => ({
      ...prev,
      description: template.desc,
      category: template.category
    }));
  };

  const formatKES = (amount: string) => {
    const num = parseFloat(amount);
    return isNaN(num) ? 'KES 0' : `KES ${num.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Plus className="w-5 h-5 text-kenya-blue" />
            <span>Ongeza Shughuli</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Transaction Type */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                type="button"
                variant={formData.type === 'income' ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
                className={`p-4 ${formData.type === 'income' ? 'bg-kenya-green hover:bg-kenya-green/90' : ''}`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">+</div>
                  <div className="text-sm">Mapato</div>
                </div>
              </Button>
              
              <Button
                type="button"
                variant={formData.type === 'expense' ? 'default' : 'outline'}
                onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
                className={`p-4 ${formData.type === 'expense' ? 'bg-kenya-red hover:bg-kenya-red/90' : ''}`}
              >
                <div className="text-center">
                  <div className="text-lg font-bold">-</div>
                  <div className="text-sm">Matumizi</div>
                </div>
              </Button>
            </div>

            {/* Amount */}
            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                Kiasi (KES) *
              </Label>
              <div className="relative mt-1">
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="100"
                  className={`text-lg ${errors.amount ? 'border-red-500' : ''}`}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Calculator className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              {formData.amount && (
                <p className="text-sm text-gray-600 mt-1">
                  {formatKES(formData.amount)}
                </p>
              )}
              {errors.amount && (
                <p className="text-sm text-red-600 mt-1">{errors.amount}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium">
                Jamii ya Shughuli
              </Label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-kenya-blue/20 focus:border-kenya-blue"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Maelezo ya Shughuli *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder={
                  formData.type === 'income' 
                    ? 'Mfano: Uuzaji wa mboga za majani'
                    : 'Mfano: Ununuzi wa chakula cha jioni'
                }
                className={`mt-1 ${errors.description ? 'border-red-500' : ''}`}
                rows={3}
              />
              {errors.description && (
                <p className="text-sm text-red-600 mt-1">{errors.description}</p>
              )}
            </div>

            {/* Quick Templates */}
            <div>
              <Label className="text-sm font-medium">
                Mifano ya Kawaida (Bonyeza kutumia)
              </Label>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {businessTemplates[formData.type].map((template, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    onClick={() => useTemplate(template)}
                    className="text-left justify-start text-sm h-auto p-3 hover:bg-gray-50"
                  >
                    <div>
                      <div className="font-medium">{template.desc}</div>
                      <div className="text-xs text-gray-500">{template.category}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="submit"
                className={`flex-1 ${
                  formData.type === 'income' 
                    ? 'bg-kenya-green hover:bg-kenya-green/90' 
                    : 'bg-kenya-red hover:bg-kenya-red/90'
                }`}
              >
                Ongeza {formData.type === 'income' ? 'Mapato' : 'Matumizi'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Ghairi
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
