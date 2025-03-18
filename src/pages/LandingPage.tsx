import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  Brain,
  Search,
  Clock,
  CheckCircle2,
  Building2,
  FileCheck,
  ChevronRight,
  Users,
  Star,
  AlertCircle,
  Menu,
  X,
  Sparkles,
  BadgeCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { AuthModal } from '../components/AuthModal';
import { BusinessReadinessCheck } from '../components/BusinessReadinessCheck';
import { HowItWorks } from '../components/HowItWorks';
import { Pricing } from '../components/Pricing';

export function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [onlineCAs] = useState(Math.floor(Math.random() * (160 - 120 + 1) + 120));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white font-body text-charcoal">
      {/* Fixed Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 glass-header transition-all duration-300 ${isScrolled ? 'py-3 shadow-lg' : 'py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-heading text-2xl gradient-text">OpenBiz</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <Link to="/login" className="text-charcoal/80 hover:text-primary">Login</Link>
              <button 
                onClick={() => setShowAuthModal(true)}
                className="gradient-bg text-white px-4 py-2 rounded-lg font-semibold hover-scale"
              >
                Start Free
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-charcoal" />
              ) : (
                <Menu className="w-6 h-6 text-charcoal" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 p-4">
            <nav className="flex flex-col gap-4">
              <a href="#how-it-works" className="nav-link">How It Works</a>
              <a href="#pricing" className="nav-link">Pricing</a>
              <Link to="/login" className="text-charcoal/80 hover:text-primary">Login</Link>
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setShowAuthModal(true);
                }}
                className="gradient-bg text-white px-4 py-2 rounded-lg font-semibold hover-scale w-full"
              >
                Start Free
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content with Padding for Fixed Header */}
      <main className="pt-24">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 animated-gradient" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8">
                <h1 className="font-heading text-6xl mb-6 leading-tight">
                  From Idea to Business{' '}
                  <span className="gradient-text">in Minutes.</span>
                </h1>
                <p className="text-xl text-charcoal/80 mb-8">
                  AI-driven Idea validation + CA-backed business registration = launch faster than ordering biryani.
                </p>
                <button 
                  onClick={() => setShowAuthModal(true)}
                  className="gradient-bg text-white px-8 py-4 rounded-xl text-lg font-semibold flex items-center gap-2 hover-scale shadow-lg group"
                >
                  Launch my dream business
                  <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
                </button>
              </div>
              <div className="lg:col-span-4">
                <BusinessReadinessCheck />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <HowItWorks />

        
        {/* Pricing */}
        <Pricing />

        {/* Sticky CTA */}
        <div className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-2 text-urgent">
              <AlertCircle className="w-5 h-5" />
              <span>Early bird discount upto 50% off on new business registration</span>
            </div>
            <button 
              onClick={() => setShowAuthModal(true)}
              className="gradient-bg text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover-scale"
            >
              Launch Now <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-charcoal text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-heading text-lg mb-4">Company</h3>
                <ul className="space-y-2 text-white/60">
                  <li>About OpenBiz</li>
                  <li>Contact Us</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg mb-4">Legal</h3>
                <ul className="space-y-2 text-white/60">
                  <li>Terms & Conditions</li>
                  <li>Privacy Policy</li>
                  <li>Refund Policy</li>
                </ul>
              </div>
              <div>
                <h3 className="font-heading text-lg mb-4">Support</h3>
                <ul className="space-y-2 text-white/60">
                  <li>Usage Guidelines</li>
                  <li>Help Center</li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/60">
              OpenBiz © {new Date().getFullYear()} | Made for India's Entrepreneurs
            </div>
          </div>
        </footer>
      </main>

      {/* Auth Modal */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
}