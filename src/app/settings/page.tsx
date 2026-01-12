'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    User,
    Palette,
    Calculator,
    Bell,
    Shield,
    Save,
    Building,
    Upload
} from 'lucide-react';

export default function SettingsPage() {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '+44 7700 900123'
    });

    const [branding, setBranding] = useState({
        companyName: 'Bourarro Properties',
        logoUrl: '',
        primaryColor: '#10b981'
    });

    const [preferences, setPreferences] = useState({
        defaultStrategy: 'BTL',
        defaultLTV: 75,
        defaultInterestRate: 5.5,
        darkMode: true,
        emailNotifications: true,
        pushNotifications: false
    });

    const colorOptions = [
        { name: 'Emerald', value: '#10b981' },
        { name: 'Blue', value: '#3b82f6' },
        { name: 'Purple', value: '#8b5cf6' },
        { name: 'Rose', value: '#f43f5e' },
        { name: 'Amber', value: '#f59e0b' },
    ];

    const handleSave = () => {
        // In production: save to Supabase
        alert('Settings saved!');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
            {/* Page Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-1">Manage your account and preferences</p>
            </div>

            <div className="max-w-4xl space-y-6">
                {/* Profile Section */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <User className="w-5 h-5 text-emerald-400" />
                            Profile
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Your personal information
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
                                {profile.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <Button variant="outline" className="border-slate-600 text-slate-300">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload Photo
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Full Name</Label>
                                <Input
                                    value={profile.name}
                                    onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Email</Label>
                                <Input
                                    type="email"
                                    value={profile.email}
                                    onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Phone</Label>
                                <Input
                                    value={profile.phone}
                                    onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Branding Section */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Building className="w-5 h-5 text-purple-400" />
                            Branding
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Customize your investor packs
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Company Name</Label>
                                <Input
                                    value={branding.companyName}
                                    onChange={(e) => setBranding(b => ({ ...b, companyName: e.target.value }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Logo URL</Label>
                                <Input
                                    value={branding.logoUrl}
                                    onChange={(e) => setBranding(b => ({ ...b, logoUrl: e.target.value }))}
                                    placeholder="https://..."
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-slate-300">Brand Color</Label>
                            <div className="flex items-center gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        onClick={() => setBranding(b => ({ ...b, primaryColor: color.value }))}
                                        className={`w-10 h-10 rounded-lg border-2 transition-all ${branding.primaryColor === color.value
                                                ? 'border-white scale-110 ring-2 ring-white/20'
                                                : 'border-transparent hover:scale-105'
                                            }`}
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Calculator Defaults */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-cyan-400" />
                            Calculator Defaults
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            Pre-fill values for new analyses
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label className="text-slate-300">Default Strategy</Label>
                                <Select
                                    value={preferences.defaultStrategy}
                                    onValueChange={(v) => setPreferences(p => ({ ...p, defaultStrategy: v }))}
                                >
                                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="BTL">Buy-to-Let</SelectItem>
                                        <SelectItem value="BRRR">BRRR</SelectItem>
                                        <SelectItem value="HMO">HMO</SelectItem>
                                        <SelectItem value="R2R">Rent-to-Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Default LTV (%)</Label>
                                <Input
                                    type="number"
                                    value={preferences.defaultLTV}
                                    onChange={(e) => setPreferences(p => ({ ...p, defaultLTV: Number(e.target.value) }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-slate-300">Default Interest Rate (%)</Label>
                                <Input
                                    type="number"
                                    step="0.1"
                                    value={preferences.defaultInterestRate}
                                    onChange={(e) => setPreferences(p => ({ ...p, defaultInterestRate: Number(e.target.value) }))}
                                    className="bg-slate-700 border-slate-600 text-white"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Notifications */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Bell className="w-5 h-5 text-amber-400" />
                            Notifications
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                            How we can reach you
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-white font-medium">Email Notifications</p>
                                <p className="text-sm text-slate-400">Receive deal alerts and updates via email</p>
                            </div>
                            <Switch
                                checked={preferences.emailNotifications}
                                onCheckedChange={(v) => setPreferences(p => ({ ...p, emailNotifications: v }))}
                            />
                        </div>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-white font-medium">Push Notifications</p>
                                <p className="text-sm text-slate-400">Browser notifications for urgent alerts</p>
                            </div>
                            <Switch
                                checked={preferences.pushNotifications}
                                onCheckedChange={(v) => setPreferences(p => ({ ...p, pushNotifications: v }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Appearance */}
                <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                        <CardTitle className="text-white flex items-center gap-2">
                            <Palette className="w-5 h-5 text-rose-400" />
                            Appearance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-white font-medium">Dark Mode</p>
                                <p className="text-sm text-slate-400">Use dark theme throughout the app</p>
                            </div>
                            <Switch
                                checked={preferences.darkMode}
                                onCheckedChange={(v) => setPreferences(p => ({ ...p, darkMode: v }))}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    );
}
