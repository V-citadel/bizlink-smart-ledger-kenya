
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mic, MicOff, Volume2, X, Loader2 } from 'lucide-react';

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
  const [parsedTransaction, setParsedTransaction] = useState<any>(null);
  const [error, setError] = useState('');
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'sw-KE'; // Swahili (Kenya)
      
      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          }
        }
        
        if (finalTranscript) {
          setTranscript(finalTranscript);
          processVoiceInput(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        setError(`Kosa la sauti: ${event.error}`);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      setError('Simu yako haiwezi kutambua sauti');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const processVoiceInput = (text: string) => {
    setIsProcessing(true);
    
    // Simple NLP for Swahili/English transaction parsing
    const lowerText = text.toLowerCase();
    
    // Determine transaction type
    const incomeKeywords = ['nilipata', 'nimepokea', 'mapato', 'uuzaji', 'received', 'earned', 'income', 'sale'];
    const expenseKeywords = ['nilitumia', 'niliuza', 'matumizi', 'nililipa', 'spent', 'bought', 'paid', 'expense'];
    
    let type: 'income' | 'expense' = 'expense';
    if (incomeKeywords.some(keyword => lowerText.includes(keyword))) {
      type = 'income';
    } else if (expenseKeywords.some(keyword => lowerText.includes(keyword))) {
      type = 'expense';
    }

    // Extract amount (look for numbers)
    const amountMatch = text.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    const amount = amountMatch ? parseFloat(amountMatch[1].replace(/,/g, '')) : 0;

    // Extract description (simplified)
    let description = text;
    if (amountMatch) {
      description = text.replace(amountMatch[0], '').trim();
    }

    // Determine category based on keywords
    let category = 'Mingine';
    const categoryMap = {
      'Chakula': ['chakula', 'nyama', 'mboga', 'food', 'vegetables', 'meat'],
      'Usafiri': ['matatu', 'basi', 'pikipiki', 'transport', 'bus', 'taxi'],
      'Biashara': ['biashara', 'duka', 'uuzaji', 'business', 'shop', 'stock'],
      'Nyumba': ['kodi', 'nyumba', 'rent', 'house', 'home'],
      'Simu': ['airtime', 'mabundles', 'simu', 'phone', 'data']
    };

    for (const [cat, keywords] of Object.entries(categoryMap)) {
      if (keywords.some(keyword => lowerText.includes(keyword))) {
        category = cat;
        break;
      }
    }

    const parsedData = {
      type,
      amount,
      description: description || `${type === 'income' ? 'Mapato' : 'Matumizi'} ya ${amount}`,
      category,
      source: 'voice' as const
    };

    setParsedTransaction(parsedData);
    setIsProcessing(false);
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setTranscript('');
      setError('');
      setParsedTransaction(null);
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const confirmTransaction = () => {
    if (parsedTransaction && parsedTransaction.amount > 0) {
      onTransactionAdd(parsedTransaction);
      onClose();
    }
  };

  const speakInstructions = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        'Sema kama hivi: Nilipata shilingi mia mbili kutoka kwa uuzaji wa mboga. Au, Nilitumia shilingi hamsini kwa chakula.'
      );
      utterance.lang = 'sw-KE';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white animate-bounce-in">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Mic className="w-5 h-5 text-kenya-red" />
            <span>Ongeza kwa Sauti</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-orange-800">Maelekezo (Instructions):</p>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={speakInstructions}
                className="text-orange-600 hover:text-orange-700"
              >
                <Volume2 className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-orange-700">
              Sema kama: "Nilipata shilingi mia mbili kutoka uuzaji" au "Nilitumia shilingi hamsini kwa chakula"
            </p>
          </div>

          {/* Voice Recording */}
          <div className="text-center space-y-4">
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`w-24 h-24 rounded-full ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-kenya-red hover:bg-kenya-red/90'
              }`}
              disabled={!!error}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-white" />
              ) : (
                <Mic className="w-8 h-8 text-white" />
              )}
            </Button>
            
            <p className="text-sm text-gray-600">
              {isListening ? 'Sikiliza... Sema sasa!' : 'Bonyeza kuanza kusema'}
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Transcript Display */}
          {transcript && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm font-medium text-blue-800 mb-1">Ulisema:</p>
              <p className="text-sm text-blue-700">"{transcript}"</p>
            </div>
          )}

          {/* Processing */}
          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm">Ninachakata...</span>
            </div>
          )}

          {/* Parsed Transaction */}
          {parsedTransaction && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-medium text-green-800">Nimeeleweka:</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Aina:</span>
                  <Badge variant={parsedTransaction.type === 'income' ? 'default' : 'destructive'}>
                    {parsedTransaction.type === 'income' ? 'Mapato' : 'Matumizi'}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Kiasi:</span>
                  <span className="font-medium">KES {parsedTransaction.amount.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Maelezo:</span>
                  <span className="text-sm text-right max-w-48">{parsedTransaction.description}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Jamii:</span>
                  <Badge variant="outline">{parsedTransaction.category}</Badge>
                </div>
              </div>

              <div className="flex space-x-2 pt-2">
                <Button 
                  onClick={confirmTransaction}
                  className="flex-1 bg-kenya-green hover:bg-kenya-green/90"
                  disabled={!parsedTransaction.amount}
                >
                  Thibitisha
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setParsedTransaction(null)}
                  className="flex-1"
                >
                  Rudia
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VoiceInput;
