'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Search,
    Kanban,
    Settings,
    FileText,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    LogIn,
    LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { LoginModal } from '@/components/auth/LoginModal';

interface NavItem {
    label: string;
    href: string;
    icon: typeof LayoutDashboard;
}

const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Analyser', href: '/analyser', icon: Search },
    { label: 'Pipeline', href: '/pipeline', icon: Kanban },
    { label: 'Investor Packs', href: '/packs', icon: FileText },
    { label: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const { user, loading, signOut } = useAuth();

    return (
        <aside className={cn(
            'sticky left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-50 flex-shrink-0',
            collapsed ? 'w-16' : 'w-64'
        )}>
            {/* Logo Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
                {!collapsed && (
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Anna Lyzer
                        </span>
                    </Link>
                )}
                {collapsed && (
                    <div className="w-8 h-8 mx-auto rounded-lg bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                )}
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 py-6 px-3 space-y-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                                isActive
                                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30'
                                    : 'text-slate-400 hover:text-white hover:bg-slate-800',
                                collapsed && 'justify-center px-2'
                            )}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={cn('w-5 h-5 flex-shrink-0', isActive && 'text-emerald-400')} />
                            {!collapsed && (
                                <span className="text-sm font-medium">{item.label}</span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="p-3 border-t border-slate-800">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="w-4 h-4" />
                    ) : (
                        <>
                            <ChevronLeft className="w-4 h-4" />
                            <span className="text-sm">Collapse</span>
                        </>
                    )}
                </button>
            </div>

            {/* User Avatar / Login */}
            {!collapsed && (
                <div className="p-4 border-t border-slate-800">
                    {loading ? (
                        <div className="h-9 w-full bg-slate-700 animate-pulse rounded-lg" />
                    ) : user ? (
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-xs font-bold text-white">
                                    {user.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate max-w-[120px]">
                                        {user.displayName || user.email?.split('@')[0]}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate max-w-[120px]">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => signOut()}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700"
                                title="Sign out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-medium hover:from-emerald-400 hover:to-cyan-400"
                        >
                            <LogIn className="w-4 h-4" />
                            Sign In
                        </button>
                    )}
                </div>
            )}

            {/* Login Modal */}
            <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </aside>
    );
}
