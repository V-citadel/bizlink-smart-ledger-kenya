
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, X, Volume2, VolumeX, Lightbulb, TrendingUp, AlertTriangle } from 'lucide-react';

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

const Assistant: React.FC<AssistantProps> = ({ onClose, transactions }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  const steps = [
    {
      title: "Karibu Biz Link!",
      content: "Mimi ni msaidizi wako wa biashara. Nitakuongoza jinsi ya kutumia programu hii kuongeza mapato na matumizi yako.",
      swahili: "Karibu Biz Link! Mimi ni msaidizi wako wa biashara. Nitakuongoza jinsi ya kutumia programu hii.",
      tips: ["Programu hii itakusaidia kufuatilia faida yako", "Unaweza kutumia sauti, picha, au kuandika"]
    },
    {
      title: "Kuongeza Shughuli",
      content: "Kuna njia tatu za kuongeza mapato na matumizi: kutumia sauti, kupiga picha ya risiti, au kuandika kwa mkono.",
      swahili: "Kuna njia tatu za kuongeza shughuli za biashara yako",
      tips: ["Sauti - haraka na rahisi", "Picha - kwa marisiti", "Kawaida - udhibiti kamili"]
    },
    {
      title: "Kutumia Sauti",
      content: "Bonyeza kitufe cha 'Sauti' na sema kama: 'Nilipata shilingi mia mbili kutoka uuzaji wa mboga' au 'Nilitumia shilingi hamsini kwa chakula'.",
      swahili: "Sema tu kama unavyoongea kawaida. Mfano: Nilipata shilingi mia mbili uuzaji",
      tips: ["Unaweza kuongea Kiswahili au Kingereza", "Taja kiasi na kile ulifanya"]
    },
    {
      title: "Kupiga Picha",
      content: "Piga picha ya risiti yako na tutasoma taarifa za malipo. Hii ni rahisi kwa biashara za duka.",
      swahili: "Piga picha ya risiti yako, tutasoma kiotomatiki",
      tips: ["Hakikisha picha ni wazi", "Risiti iwe imeangaza vizuri"]
    },
    {
      title: "Kuona Faida Yako",
      content: "Katika ukurasa mkuu, utaona jumla ya mapato, matumizi, na faida yako. Hii itakusaidia kujua kama unafanya faida.",
      swahili: "Ukurasa mkuu unaonyesha mapato, matumizi na faida yako",
      tips: ["Faida ni mapato minus matumizi", "Chunguza kila siku ili ujue hali ya biashara"]
    }
  ];

  const businessInsights = [
    {
      icon: TrendingUp,
      title: "Faida ya Leo",
      message: transactions.length > 0 
        ? `Una shughuli ${transactions.length}. Endelea vizuri!`
        : "Anza kuongeza shughuli zako za leo."
    },
    {
      icon: Lightbulb,
      title: "Ushauri",
      message: "Fuatilia matumizi yako kila siku ili ujue mahali unakopoteza pesa."
    },
    {
      icon: AlertTriangle,
      title: "Kumbuka",
      message: "Andika kila kitu - hata kiasi kidogo. Hiki ni muhimu kwa biashara yako."
    }
  ];

  const speak = (text: string) => {
    if (!speechEnabled || !('speechSynthesis' in window)) return;
    
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'sw-KE';
    utterance.rate = 0.8;
    utterance.pitch = 1.1;
    
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  useEffect(() => {
    if (speechEnabled && currentStep < steps.length) {
      setTimeout(() => {
        speak(steps[currentStep].swahili);
      }, 500);
    }
  }, [currentStep, speechEnabled]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSpeech = () => {
    if (isSpeaking) {
      stopSpeaking();
    }
    setSpeechEnabled(!speechEnabled);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-kenya-red to-kenya-green text-white">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <MessageCircle className="w-5 h-5" />
            <span>Msaidizi wa Biz Link</span>
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSpeech}
              className="text-white hover:bg-white/20"
            >
              {speechEnabled && !isSpeaking ? (
                <Volume2 className="w-4 h-4" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          {currentStep < steps.length ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-kenya-green h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">
                  {currentStep + 1}/{steps.length}
                </span>
              </div>

              {/* Current Step */}
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {steps[currentStep].title}
                  </h3>
                  <div className="w-16 h-16 mx-auto mb-4 gradient-kenya rounded-full flex items-center justify-center animate-float">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 text-center text-lg leading-relaxed">
                    {steps[currentStep].content}
                  </p>
                </div>

                {/* Tips */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Vidokezo:</h4>
                  {steps[currentStep].tips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-kenya-green rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-gray-700">{tip}</p>
                    </div>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between pt-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 0}
                  >
                    Nyuma
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="bg-kenya-green hover:bg-kenya-green/90"
                    disabled={currentStep === steps.length - 1}
                  >
                    {currentStep === steps.length - 1 ? 'Maliza' : 'Mbele'}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            // Completion Screen with Business Insights
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-kenya-green rounded-full flex items-center justify-center animate-bounce-in">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Hongera! Umemaliza Mafunzo
                </h3>
                <p className="text-gray-600">
                  Sasa unaweza kuanza kutumia Biz Link kuongeza mapato na matumizi yako.
                </p>
              </div>

              {/* Business Insights */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Taarifa za Biashara Yako:</h4>
                {businessInsights.map((insight, index) => (
                  <div 
                    key={index}
                    className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 bg-kenya-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <insight.icon className="w-5 h-5 text-kenya-blue" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">{insight.title}</h5>
                      <p className="text-sm text-gray-600">{insight.message}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                onClick={onClose}
                className="w-full bg-kenya-green hover:bg-kenya-green/90 text-white py-3"
              >
                Anza Kutumia Biz Link
              </Button>
            </div>
          )}

          {/* Speech indicator */}
          {isSpeaking && (
            <div className="fixed bottom-4 right-4 bg-kenya-green text-white px-4 py-2 rounded-full flex items-center space-x-2 animate-pulse">
              <Volume2 className="w-4 h-4" />
              <span className="text-sm">Ninaongea...</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Assistant;
