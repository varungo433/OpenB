import React, { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface PricingPlan {
  title: string;
  originalPrice: number;
  discountedPrice: number;
  features: string[];
  tag?: string;
  highlight?: boolean;
}

const plans: PricingPlan[] = [
  {
    title: 'Sole Proprietorship',
    originalPrice: 3499,
    discountedPrice: 1999,
    features: ['Shop Act License', 'GST Registration', 'Udyam Registration'],
    tag: '70% of startups choose this',
    highlight: true,
  },
  {
    title: 'One Person Company',
    originalPrice: 14999,
    discountedPrice: 8999,
    features: ['DIN/DSC', 'MCA Filing', 'GST Registration'],
    tag: 'Ideal for solo founders',
  },
  {
    title: 'LLP/Partnership',
    originalPrice: 19999,
    discountedPrice: 11999,
    features: ['LLP Agreement', 'PAN/TAN', 'GST Registration'],
    tag: '3 slots left this week',
  },
  {
    title: 'Private Limited',
    originalPrice: 24999,
    discountedPrice: 14999,
    features: ['Incorporation', 'GST/ROC', 'All Compliances'],
    tag: 'Free FSSAI license (save ₹2,499)',
  },
];

export function Pricing() {
  const [timeLeft, setTimeLeft] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section id="pricing" className="py-20 bg-gradient-to-b from-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading mb-4">
            Start Smarter, Save Bigger
          </h2>
          <p className="text-xl text-charcoal/70">
            Early birds get 40% off + free GST registration
          </p>
        </div>

        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-urgent/10 text-urgent px-4 py-2 rounded-full">
            <span className="animate-pulse">⏳</span>
            <span>40% OFF ENDS IN {formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`glass-card rounded-xl p-8 hover-scale ${
                plan.highlight ? 'border-2 border-primary' : ''
              }`}
            >
              {plan.tag && (
                <div className={`inline-block px-3 py-1 rounded-full text-sm mb-4 ${
                  plan.highlight 
                    ? 'bg-primary/10 text-primary'
                    : 'bg-success/10 text-success'
                }`}>
                  {plan.tag}
                </div>
              )}
              <h3 className="font-heading text-xl mb-4">{plan.title}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-3xl font-bold">₹{plan.discountedPrice}</span>
                <span className="text-charcoal/60 line-through">
                  ₹{plan.originalPrice}
                </span>
                <span className="text-success text-sm">
                  Save {Math.round((1 - plan.discountedPrice / plan.originalPrice) * 100)}%
                </span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className={`w-5 h-5 ${
                      plan.highlight ? 'text-primary' : 'text-success'
                    }`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button className="w-full gradient-bg text-white rounded-lg py-3 font-semibold hover-scale">
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}