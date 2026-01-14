'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { getUserProfile, updateUserProfile, defaultProfile } from '@/lib/firestore/user';
import { Loader2, User, Building, Settings, Bell, Palette, Upload, Save, Check } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [profile, setProfile] = useState(defaultProfile.profile);
    const [branding, setBranding] = useState(defaultProfile.branding);
    const [preferences, setPreferences] = useState(defaultProfile.preferences);

    useEffect(() => {
        async function loadProfile() {
            if (authLoading) return;

            if (user?.uid) {
                setLoading(true);
                const data = await getUserProfile(user.uid);
                if (data) {
                    setProfile(data.profile);
                    setBranding(data.branding);
                    setPreferences(data.preferences);
                }
            }
            setLoading(false);
        }
        loadProfile();
    }, [user, authLoading]);

    const colorOptions = [
        { name: 'Emerald', value: '#10b981', class: 'bg-emerald-500' },
        { name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
        { name: 'Purple', value: '#8b5cf6', class: 'bg-purple-500' },
        { name: 'Rose', value: '#f43f5e', class: 'bg-rose-500' },
        { name: 'Amber', value: '#f59e0b', class: 'bg-amber-500' },
    ];

    const handleSave = async () => {
        if (!user?.uid) return;

        setSaving(true);
        const success = await updateUserProfile(user.uid, {
            profile,
            branding,
            preferences
        });

        if (success) {
            // Optional: Show toast
        } else {
            alert('Failed to save settings. Please try again.');
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>
                        <p className="text-slate-400 mt-2">Manage your account, branding, and application preferences</p>
                    </div>
                    <Button
                        onClick={handleSave}
                        disabled={saving}
                        className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-500/20 rounded-xl px-6"
                    >
                        {saving ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </Button>
                </div>

                <Tabs defaultValue="profile" className="space-y-8">
                    <TabsList className="bg-slate-900/50 p-1 border border-slate-800/50 rounded-xl">
                        <TabsTrigger value="profile" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2">
                            <User className="w-4 h-4 mr-2" />
                            Profile
                        </TabsTrigger>
                        <TabsTrigger value="branding" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2">
                            <Building className="w-4 h-4 mr-2" />
                            branding
                        </TabsTrigger>
                        <TabsTrigger value="preferences" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white text-slate-400 rounded-lg px-4 py-2">
                            <Settings className="w-4 h-4 mr-2" />
                            Preferences
                        </TabsTrigger>
                    </TabsList>

                    {/* Profile Tab */}
                    <TabsContent value="profile" className="space-y-6">
                        <GlassCard className="p-6">
                            <div className="flex items-center gap-6 mb-8">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-700 border border-slate-600 flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-black/20">
                                    {profile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Profile Picture</h3>
                                    <p className="text-sm text-slate-400 mb-4">Upload a professional photo for your investor packs</p>
                                    <Button variant="outline" className="border-slate-700 hover:bg-slate-800 text-slate-300">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Upload New
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Full Name</Label>
                                    <Input
                                        value={profile.name}
                                        onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Email Address</Label>
                                    <Input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Phone Number</Label>
                                    <Input
                                        value={profile.phone}
                                        onChange={(e) => setProfile(p => ({ ...p, phone: e.target.value }))}
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>
                        </GlassCard>
                    </TabsContent>

                    {/* Branding Tab */}
                    <TabsContent value="branding" className="space-y-6">
                        <GlassCard className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Company Name</Label>
                                    <Input
                                        value={branding.companyName}
                                        onChange={(e) => setBranding(b => ({ ...b, companyName: e.target.value }))}
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Website URL</Label>
                                    <Input
                                        placeholder="https://..."
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-slate-300">Logo URL</Label>
                                    <Input
                                        value={branding.logoUrl}
                                        onChange={(e) => setBranding(b => ({ ...b, logoUrl: e.target.value }))}
                                        placeholder="https://..."
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <Label className="text-slate-300">Brand Accent Color</Label>
                                <div className="flex flex-wrap gap-4">
                                    {colorOptions.map((color) => (
                                        <button
                                            key={color.value}
                                            onClick={() => setBranding(b => ({ ...b, primaryColor: color.value }))}
                                            className={cn(
                                                "w-12 h-12 rounded-xl transition-all relative flex items-center justify-center",
                                                color.class,
                                                branding.primaryColor === color.value
                                                    ? "ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-110 shadow-lg shadow-current/20"
                                                    : "opacity-70 hover:opacity-100 hover:scale-105"
                                            )}
                                            title={color.name}
                                        >
                                            {branding.primaryColor === color.value && (
                                                <Check className="w-5 h-5 text-white" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </GlassCard>
                    </TabsContent>

                    {/* Preferences Tab */}
                    <TabsContent value="preferences" className="space-y-6">
                        <GlassCard className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-emerald-400" />
                                Calculator Defaults
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Default Strategy</Label>
                                    <Select
                                        value={preferences.defaultStrategy}
                                        onValueChange={(v) => setPreferences(p => ({ ...p, defaultStrategy: v }))}
                                    >
                                        <SelectTrigger className="bg-slate-950/50 border-slate-800 text-white">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent className="bg-slate-900 border-slate-800 text-white">
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
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-slate-300">Interest Rate (%)</Label>
                                    <Input
                                        type="number"
                                        step="0.1"
                                        value={preferences.defaultInterestRate}
                                        onChange={(e) => setPreferences(p => ({ ...p, defaultInterestRate: Number(e.target.value) }))}
                                        className="bg-slate-950/50 border-slate-800 focus:border-emerald-500/50 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-amber-400" />
                                Notifications
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Email Notifications</p>
                                        <p className="text-sm text-slate-400">Receive deal alerts and report summaries</p>
                                    </div>
                                    <Switch
                                        checked={preferences.emailNotifications}
                                        onCheckedChange={(v) => setPreferences(p => ({ ...p, emailNotifications: v }))}
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-white font-medium">Push Notifications</p>
                                        <p className="text-sm text-slate-400">Real-time alerts for new hot leads</p>
                                    </div>
                                    <Switch
                                        checked={preferences.pushNotifications}
                                        onCheckedChange={(v) => setPreferences(p => ({ ...p, pushNotifications: v }))}
                                    />
                                </div>
                            </div>
                        </GlassCard>

                        <GlassCard className="p-6">
                            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                <Palette className="w-5 h-5 text-rose-400" />
                                Appearance
                            </h3>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white font-medium">Dark Mode</p>
                                    <p className="text-sm text-slate-400">Enable dark theme (recommended)</p>
                                </div>
                                <Switch
                                    checked={preferences.darkMode}
                                    onCheckedChange={(v) => setPreferences(p => ({ ...p, darkMode: v }))}
                                />
                            </div>
                        </GlassCard>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
