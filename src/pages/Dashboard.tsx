import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  Plus,
  MessageSquare,
  Bell,
  Upload,
  Send,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { ApplicationStatus } from '../components/dashboard/ApplicationStatus';
import { BusinessRegistration } from '../components/dashboard/BusinessRegistration';
import { Profile } from '../components/dashboard/Profile';
import { CAChat } from '../components/dashboard/CAChat';

export function Dashboard() {
  const location = useLocation();
  const [showNewBusinessModal, setShowNewBusinessModal] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const navigation = [
    { name: 'Overview', path: '/dashboard', icon: Home },
    { name: 'Applications', path: '/dashboard/applications', icon: FileText },
    { name: 'Team', path: '/dashboard/team', icon: Users },
    { name: 'Settings', path: '/dashboard/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <span className="font-heading text-2xl gradient-text">OpenBiz</span>
        </div>

        <nav className="mt-6">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 text-sm font-medium ${
                  location.pathname === item.path
                    ? 'text-primary bg-purple-50'
                    : 'text-gray-600 hover:text-primary hover:bg-purple-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="absolute bottom-8 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex items-center justify-between mb-8">
            <h1 className="font-heading text-3xl">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 relative">
                <Bell className="w-6 h-6" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button
                onClick={() => setShowNewBusinessModal(true)}
                className="gradient-bg text-white px-4 py-2 rounded-lg font-semibold hover-scale flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Start New Business
              </button>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<ApplicationStatus />} />
            <Route path="/applications" element={<BusinessRegistration />} />
            <Route path="/team" element={<Profile />} />
            <Route path="/settings" element={<Profile />} />
          </Routes>
        </div>
      </main>

      {/* CA Chat Widget */}
      <CAChat />
    </div>
  );
}