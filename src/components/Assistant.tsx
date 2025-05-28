
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Send, Bot, User } from 'lucide-react';

interface AssistantProps {
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

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Assistant: React.FC<AssistantProps> = ({ onClose, transactions }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your business assistant. I can help you analyze your transactions, answer questions about your finances, or provide business insights. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Calculate some basic stats
    const totalIncome = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
    const profit = totalIncome - totalExpenses;
    
    if (lowerMessage.includes('profit') || lowerMessage.includes('revenue')) {
      return `Based on your current transactions, you have:\n• Total Income: KES ${totalIncome.toLocaleString()}\n• Total Expenses: KES ${totalExpenses.toLocaleString()}\n• Net Profit: KES ${profit.toLocaleString()}\n\n${profit > 0 ? 'Great job! Your business is profitable.' : 'Consider reviewing your expenses to improve profitability.'}`;
    }
    
    if (lowerMessage.includes('expense') || lowerMessage.includes('spending')) {
      const categories = transactions
        .filter(t => t.type === 'expense')
        .reduce((acc, t) => {
          acc[t.category] = (acc[t.category] || 0) + t.amount;
          return acc;
        }, {} as Record<string, number>);
      
      const topCategory = Object.entries(categories).sort(([,a], [,b]) => b - a)[0];
      
      return `Your total expenses are KES ${totalExpenses.toLocaleString()}. ${topCategory ? `Your highest expense category is "${topCategory[0]}" with KES ${topCategory[1].toLocaleString()}.` : ''} Consider tracking categories to identify cost-saving opportunities.`;
    }
    
    if (lowerMessage.includes('advice') || lowerMessage.includes('tip')) {
      const tips = [
        'Track every transaction, no matter how small - it all adds up!',
        'Review your expenses weekly to identify unnecessary costs.',
        'Set aside 20% of your income for emergencies and growth.',
        'Consider separate accounts for business and personal expenses.',
        'Use categories to better understand where your money goes.'
      ];
      return tips[Math.floor(Math.random() * tips.length)];
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! I\'m here to help you with your business finances. You can ask me about your profit, expenses, income, or request business advice.';
    }
    
    // Default response
    return 'I can help you analyze your transactions and provide business insights. Try asking me about your profit, expenses, or request some business advice!';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: generateResponse(inputMessage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[600px] bg-white flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between border-b">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Bot className="w-5 h-5 text-blue-600" />
            <span>Business Assistant</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'assistant' && (
                      <Bot className="w-4 h-4 mt-1 text-blue-600" />
                    )}
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1 text-white" />
                    )}
                    <div>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-900 p-3 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4 text-blue-600" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about your business finances..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;
