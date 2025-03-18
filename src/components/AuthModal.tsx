import React, { useState } from 'react';
import { X, ArrowRight, Shield, Mail, Phone, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthTab = 'login' | 'signup';

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(3);

  if (!isOpen) return null;

  const isEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const isPhone = (value: string) => {
    return /^[0-9]{10}$/.test(value);
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/onboarding`,
        },
      });
      if (error) throw error;
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
    }
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEmail(identifier)) {
        const { error } = await supabase.auth.signInWithOtp({
          email: identifier,
          options: {
            data: {
              first_login: activeTab === 'signup'
            }
          }
        });
        if (error) throw error;
      } else if (isPhone(identifier)) {
        const { error } = await supabase.auth.signInWithOtp({
          phone: `+91${identifier}`,
          options: {
            data: {
              first_login: activeTab === 'signup'
            }
          }
        });
        if (error) throw error;
      } else {
        throw new Error('Please enter a valid email or phone number');
      }
      setShowOtp(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.verifyOtp({
        email: isEmail(identifier) ? identifier : undefined,
        phone: isPhone(identifier) ? `+91${identifier}` : undefined,
        token: otp,
        type: isEmail(identifier) ? 'email' : 'sms',
      });
      
      if (error) {
        setAttempts(prev => prev - 1);
        throw error;
      }
      
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.user_metadata?.first_login) {
        window.location.href = '/onboarding';
      } else {
        window.location.href = '/dashboard';
      }
    } catch (err: any) {
      setError(`Invalid OTP. ${attempts - 1} attempts left.`);
      if (attempts <= 1) {
        setShowOtp(false);
        setAttempts(3);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-6">
          <Shield className="w-8 h-8 text-primary" />
          <h2 className="font-heading text-2xl">Launch Your Business</h2>
        </div>

        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'login'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('login')}
          >
            Log In
          </button>
          <button
            className={`flex-1 py-2 text-center font-medium ${
              activeTab === 'signup'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with email/phone
              </span>
            </div>
          </div>

          {!showOtp ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Enter email or phone number"
                    required
                  />
                  {isEmail(identifier) ? (
                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  ) : (
                    <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {isEmail(identifier)
                    ? 'We'll send a verification code to your email'
                    : isPhone(identifier)
                    ? 'We'll send an OTP to your phone'
                    : 'Enter a valid email or 10-digit phone number'}
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || (!isEmail(identifier) && !isPhone(identifier))}
                className="w-full gradient-bg text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover-scale disabled:opacity-50"
              >
                {loading ? 'Sending Code...' : 'Send Verification Code'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={verifyOtp} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Enter Verification Code
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className={`block w-full px-3 py-2 rounded-lg border focus:ring-2 focus:ring-primary ${
                    error ? 'border-red-300 animate-shake' : 'border-gray-300'
                  }`}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  pattern="[0-9]{6}"
                  required
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-bg text-white rounded-lg px-4 py-3 flex items-center justify-center gap-2 hover-scale disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify Code'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setShowOtp(false)}
                className="w-full text-gray-600 text-sm hover:text-gray-800"
              >
                Back to {isEmail(identifier) ? 'email' : 'phone'} input
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}