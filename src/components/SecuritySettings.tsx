
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Shield, Key, Smartphone, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface SecuritySettingsProps {
  onClose: () => void;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    autoLock: true,
    biometric: false,
    twoFactor: false,
    sessionTimeout: 30,
    dataEncryption: true,
    backupFrequency: 'daily'
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const [securityScore, setSecurityScore] = useState(75);

  const updateSetting = (key: string, value: boolean | number | string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    // Recalculate security score
    calculateSecurityScore({ ...settings, [key]: value });
  };

  const calculateSecurityScore = (currentSettings: typeof settings) => {
    let score = 0;
    if (currentSettings.autoLock) score += 20;
    if (currentSettings.biometric) score += 25;
    if (currentSettings.twoFactor) score += 30;
    if (currentSettings.dataEncryption) score += 20;
    if (currentSettings.sessionTimeout <= 15) score += 5;
    setSecurityScore(score);
  };

  const getSecurityLevel = () => {
    if (securityScore >= 80) return { level: 'Juu', color: 'text-green-600', bg: 'bg-green-100' };
    if (securityScore >= 60) return { level: 'Wastani', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Chini', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const security = getSecurityLevel();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-white animate-bounce-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold flex items-center space-x-2">
            <Shield className="w-6 h-6 text-kenya-blue" />
            <span>Mipangilio ya Usalama (Security Settings)</span>
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Security Score */}
          <Card className={`${security.bg} border-2`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Kiwango cha Usalama</h3>
                  <p className="text-sm opacity-75">Tathmini ya usalama wa data yako</p>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${security.color}`}>{securityScore}%</div>
                  <Badge className={`${security.color} ${security.bg}`}>{security.level}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Authentication Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Mipangilio ya Uthibitishaji</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Auto-Lock</Label>
                  <p className="text-xs text-gray-600">Funga app kiotomatiki baada ya muda</p>
                </div>
                <Switch
                  checked={settings.autoLock}
                  onCheckedChange={(checked) => updateSetting('autoLock', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Biometric Login</Label>
                  <p className="text-xs text-gray-600">Tumia alama za mwili kama kidole</p>
                </div>
                <Switch
                  checked={settings.biometric}
                  onCheckedChange={(checked) => updateSetting('biometric', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Two-Factor Authentication</Label>
                  <p className="text-xs text-gray-600">Ongeza hatua ya pili ya uthibitishaji</p>
                </div>
                <Switch
                  checked={settings.twoFactor}
                  onCheckedChange={(checked) => updateSetting('twoFactor', checked)}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Session Timeout (dakika)</Label>
                <Input
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                  className="mt-1"
                  min="5"
                  max="120"
                />
              </div>
            </CardContent>
          </Card>

          {/* Password Change */}
          <Card>
            <CardHeader>
              <CardTitle>Badili Nywila</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="current-password">Nywila ya Sasa</Label>
                <Input
                  id="current-password"
                  type="password"
                  value={passwords.current}
                  onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="new-password">Nywila Mpya</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={passwords.new}
                  onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="confirm-password">Thibitisha Nywila Mpya</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                  className="mt-1"
                />
              </div>

              <Button className="w-full bg-kenya-blue hover:bg-kenya-blue/90">
                Badili Nywila
              </Button>
            </CardContent>
          </Card>

          {/* Data Protection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Ulinzi wa Data</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-sm font-medium">Data Encryption</Label>
                  <p className="text-xs text-gray-600">Encrypt data kabla ya kuhifadhi</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <Badge variant="outline" className="text-green-600">Activated</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Backup Frequency</Label>
                <select
                  value={settings.backupFrequency}
                  onChange={(e) => updateSetting('backupFrequency', e.target.value)}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="hourly">Kila saa</option>
                  <option value="daily">Kila siku</option>
                  <option value="weekly">Kila wiki</option>
                  <option value="manual">Kwa mkono tu</option>
                </select>
              </div>

              <Button variant="outline" className="w-full">
                <Clock className="w-4 h-4 mr-2" />
                Fanya Backup Sasa
              </Button>
            </CardContent>
          </Card>

          {/* Security Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5" />
                <span>Arifa za Usalama</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium">App Updated</p>
                    <p className="text-xs text-gray-600">Leo, saa 10:30</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium">New Device Login</p>
                    <p className="text-xs text-gray-600">Jana, saa 15:45</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;
