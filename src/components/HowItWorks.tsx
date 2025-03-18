import React, { useState } from 'react';
import { Brain, Puzzle as PuzzlePiece, ClipboardCheck, UserCheck, Rocket, ChevronDown, ChevronUp } from 'lucide-react';

interface Step {
  icon: React.ReactNode;
  emoji: string;
  title: string;
  description: string;
  tooltip?: string;
}

const steps: Step[] = [
  {
    icon: <Brain className="w-6 h-6" />,
    emoji: '🧠',
    title: 'Idea Scan',
    description: 'Validate demand, competition & licenses in 60 seconds.',
    tooltip: '₹2,100 Cr dry fruit exports market',
  },
  {
    icon: <PuzzlePiece className="w-6 h-6" />,
    emoji: '🧩',
    title: 'Structure Wizard',
    description: 'AI recommends business type (Sole Prop/LLP/Pvt Ltd).',
    tooltip: 'Compare tax impacts',
  },
  {
    icon: <ClipboardCheck className="w-6 h-6" />,
    emoji: '📋',
    title: 'Compliance Checklist',
    description: 'State-specific licenses auto-generated.',
    tooltip: 'e.g., Shop Act for retail',
  },
  {
    icon: <UserCheck className="w-6 h-6" />,
    emoji: '👔',
    title: 'Expert Review',
    description: 'Certified professionals verify compliance.',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    emoji: '🚀',
    title: 'Launchpad',
    description: 'Track approvals like an Amazon order.',
  },
];

export function HowItWorks() {
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-heading text-center mb-4">
          Your 5-Step Journey to Legitimacy
        </h2>
        <p className="text-xl text-center text-charcoal/70 mb-12">
          From validation to launch, we handle everything
        </p>

        {/* Desktop Timeline */}
        <div className="hidden md:grid grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              <div className="glass-card rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-2xl">{step.emoji}</span>
                  </div>
                </div>
                <h3 className="font-heading text-lg mb-2">{step.title}</h3>
                <p className="text-charcoal/70 text-sm">{step.description}</p>
                {step.tooltip && (
                  <div className="absolute invisible group-hover:visible bg-white rounded-lg shadow-lg p-3 -bottom-12 left-1/2 -translate-x-1/2 w-48 text-sm text-center">
                    {step.tooltip}
                  </div>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 w-8 h-0.5 bg-primary/20" />
              )}
            </div>
          ))}
        </div>

        {/* Mobile Accordion */}
        <div className="md:hidden space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="glass-card rounded-xl overflow-hidden"
            >
              <button
                className="w-full p-4 flex items-center justify-between"
                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="text-xl">{step.emoji}</span>
                  </div>
                  <div className="text-left">
                    <span className="text-sm text-primary font-medium">Step {index + 1}</span>
                    <h3 className="font-heading text-lg">{step.title}</h3>
                  </div>
                </div>
                {expandedStep === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary" />
                )}
              </button>
              {expandedStep === index && (
                <div className="p-4 pt-0">
                  <p className="text-charcoal/70">{step.description}</p>
                  {step.tooltip && (
                    <p className="mt-2 text-sm text-primary">{step.tooltip}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}