
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mic, MicOff, X, Loader2, Check } from 'lucide-react';

interface VoiceInputProps {
  onClose: () => void;
  onTransactionAdd: (transaction: {
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    source: 'voice';
  }) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onClose, onTransactionAdd }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [manualEntry, setManualEntry] = useState({
    amount: '',
    description: '',
    type: 'expense' as 'income' | 'expense',
    category: 'General'
  });

  const recognition = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognition.current = new SpeechRecognition();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;
      recognition.current.lang = 'en-US';

      recognition.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceInput(finalTranscript);
        }
      };

      recognition.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognition.current) {
        recognition.current.stop();
      }
    };
  }, []);

  const startListening = () => {
    if (recognition.current) {
      setIsListening(true);
      setTranscript('');
      recognition.current.start();
    }
  };

  const stopListening = () => {
    if (recognition.current) {
      setIsListening(false);
      recognition.current.stop();
    }
  };

  const processVoiceInput = async (text: string) => {
    setIsProcessing(true);
    
    // Simple AI processing simulation
    setTimeout(() => {
      const amount = extractAmount(text);
      const type = text.toLowerCase().includes('received') || text.toLowerCase().includes('income') || text.toLowerCase().includes('paid') ? 'income' : 'expense';
      const description = text.replace(/[0-9]/g, '').replace(/dollar|shilling|ksh|usd/gi, '').trim();
      
      const processed = {
        amount: amount.toString(),
        description: description || 'Voice transaction',
        type,
        category: 'General'
      };
      
      setExtractedData(processed);
      setManualEntry(processed);
      setIsProcessing(false);
    }, 2000);
  };

  const extractAmount = (text: string): number => {
    const match = text.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const handleSubmit = () => {
    const amount = parseFloat(manualEntry.amount);
    if (amount > 0 && manualEntry.description.trim()) {
      onTransactionAdd({
        type: manualEntry.type,
        amount,
        description: manualEntry.description,
        category: manualEntry.category,
        source: 'voice'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Mic className="w-5 h-5 text-red-600" />
            <span>Voice Input</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              Say something like: "I spent 500 shillings on office supplies" or "Received 2000 from client payment"
            </p>
          </div>

          <div className="text-center space-y-4">
            {!isListening ? (
              <Button 
                onClick={startListening}
                className="w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isProcessing}
              >
                <Mic className="w-12 h-12" />
              </Button>
            ) : (
              <Button 
                onClick={stopListening}
                className="w-32 h-32 rounded-full bg-red-600 hover:bg-red-700 text-white animate-pulse"
              >
                <MicOff className="w-12 h-12" />
              </Button>
            )}
            
            <p className="text-sm text-gray-600">
              {isListening ? 'Listening... Speak now' : 'Tap to start recording'}
            </p>
          </div>

          {transcript && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-sm font-medium text-gray-700">You said:</p>
              <p className="text-gray-900">{transcript}</p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center py-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-blue-600" />
              <p className="text-sm text-gray-600">Processing your voice input...</p>
            </div>
          )}

          {extractedData && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <Check className="w-4 h-4 text-green-600" />
                <p className="text-sm font-medium text-green-800">Extracted information:</p>
              </div>
              <p className="text-sm text-green-700">
                Amount: KES {extractedData.amount} | {extractedData.description}
              </p>
            </div>
          )}

          {/* Manual Entry Form */}
          {extractedData && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type">Transaction Type</Label>
                  <select
                    value={manualEntry.type}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="amount">Amount (KES)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={manualEntry.amount}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, amount: e.target.value }))}
                    placeholder="100"
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={manualEntry.description}
                  onChange={(e) => setManualEntry(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="What was this transaction for?"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <select
                  value={manualEntry.category}
                  onChange={(e) => setManualEntry(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="General">General</option>
                  <option value="Office Supplies">Office Supplies</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button 
                  onClick={handleSubmit}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  disabled={!manualEntry.amount || !manualEntry.description.trim()}
                >
                  Add Transaction
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setTranscript('');
                    setExtractedData(null);
                  }}
                  className="flex-1"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                Voice recognition is not supported in your browser. Please use manual entry instead.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInput;
