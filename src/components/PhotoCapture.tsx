
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Loader2, Check } from 'lucide-react';

interface PhotoCaptureProps {
  onClose: () => void;
  onTransactionAdd: (transaction: {
    type: 'income' | 'expense';
    amount: number;
    description: string;
    category: string;
    source: 'photo';
  }) => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onClose, onTransactionAdd }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [manualEntry, setManualEntry] = useState({
    amount: '',
    description: '',
    type: 'expense' as 'income' | 'expense',
    category: 'Mingine'
  });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [showCamera, setShowCamera] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error('Kosa la kamera:', error);
      alert('Imeshindwa kuwasha kamera');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
        processImage(imageData);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
        processImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (imageData: string) => {
    setIsProcessing(true);
    
    // Simulate OCR processing (in real app, you'd use OCR service)
    setTimeout(() => {
      // Mock extracted data from receipt
      const mockData = {
        amount: Math.floor(Math.random() * 1000) + 50,
        description: 'Bidhaa za duka',
        type: 'expense' as const,
        category: 'Biashara'
      };
      
      setExtractedData(mockData);
      setManualEntry(mockData);
      setIsProcessing(false);
    }, 2000);
  };

  const handleSubmit = () => {
    const amount = parseFloat(manualEntry.amount);
    if (amount > 0 && manualEntry.description.trim()) {
      onTransactionAdd({
        type: manualEntry.type,
        amount,
        description: manualEntry.description,
        category: manualEntry.category,
        source: 'photo'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center space-x-2">
            <Camera className="w-5 h-5 text-kenya-green" />
            <span>Piga Picha ya Risiti</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {!capturedImage && !showCamera && (
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-sm text-green-700">
                  Piga picha ya risiti yako au chagua picha kutoka kwa simu yako.
                  Tutakusoma taarifa za malipo kiotomatiki.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  onClick={startCamera}
                  className="bg-kenya-green hover:bg-kenya-green/90 p-6 h-auto flex flex-col items-center space-y-2"
                >
                  <Camera className="w-8 h-8" />
                  <span>Piga Picha</span>
                </Button>

                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="p-6 h-auto flex flex-col items-center space-y-2"
                >
                  <Upload className="w-8 h-8" />
                  <span>Chagua Picha</span>
                </Button>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {showCamera && (
            <div className="space-y-4">
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full rounded-lg"
                />
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={capturePhoto}
                  className="flex-1 bg-kenya-green hover:bg-kenya-green/90"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Nasa
                </Button>
                <Button 
                  variant="outline"
                  onClick={stopCamera}
                  className="flex-1"
                >
                  Funga
                </Button>
              </div>
            </div>
          )}

          {capturedImage && (
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={capturedImage} 
                  alt="Picha iliyonaswa" 
                  className="w-full rounded-lg max-h-48 object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                    <div className="text-white text-center">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                      <p className="text-sm">Ninasoma picha...</p>
                    </div>
                  </div>
                )}
              </div>

              {extractedData && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Check className="w-4 h-4 text-blue-600" />
                    <p className="text-sm font-medium text-blue-800">Taarifa zilizopatikana:</p>
                  </div>
                  <p className="text-sm text-blue-700">
                    Kiasi: KES {extractedData.amount} | {extractedData.description}
                  </p>
                </div>
              )}

              {/* Manual Entry Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Aina ya Shughuli</Label>
                    <select
                      value={manualEntry.type}
                      onChange={(e) => setManualEntry(prev => ({ ...prev, type: e.target.value as 'income' | 'expense' }))}
                      className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="expense">Matumizi</option>
                      <option value="income">Mapato</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="amount">Kiasi (KES)</Label>
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
                  <Label htmlFor="description">Maelezo</Label>
                  <Input
                    id="description"
                    value={manualEntry.description}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Nini ulinunua au ukapata?"
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Jamii</Label>
                  <select
                    value={manualEntry.category}
                    onChange={(e) => setManualEntry(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  >
                    <option value="Biashara">Biashara</option>
                    <option value="Chakula">Chakula</option>
                    <option value="Usafiri">Usafiri</option>
                    <option value="Nyumba">Nyumba</option>
                    <option value="Simu">Simu</option>
                    <option value="Mingine">Mingine</option>
                  </select>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button 
                    onClick={handleSubmit}
                    className="flex-1 bg-kenya-green hover:bg-kenya-green/90"
                    disabled={!manualEntry.amount || !manualEntry.description.trim()}
                  >
                    Ongeza Shughuli
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setCapturedImage(null);
                      setExtractedData(null);
                    }}
                    className="flex-1"
                  >
                    Piga Upya
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PhotoCapture;
