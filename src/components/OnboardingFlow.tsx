import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  MapPin,
  Building2,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Search,
  Clock,
} from 'lucide-react';

interface OnboardingStep {
  title: string;
  progress: number;
}

const steps: OnboardingStep[] = [
  { title: 'Idea Validation', progress: 20 },
  { title: 'Validation Results', progress: 40 },
  { title: 'License Selection', progress: 60 },
  { title: 'Document Collection', progress: 80 },
  { title: 'Payment & Tracking', progress: 100 },
];

const cities = [
  { value: 'tier1', label: 'Tier 1 Cities (Mumbai, Delhi, etc.)' },
  { value: 'tier2', label: 'Tier 2 Cities' },
  { value: 'tier3', label: 'Tier 3 Cities' },
  { value: 'pan-india', label: 'Pan-India' },
  { value: 'export', label: 'Export Focus' },
];

const categories = [
  'Food & Beverages',
  'E-commerce',
  'Manufacturing',
  'Services',
  'Technology',
  'Healthcare',
];

export function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [businessIdea, setBusinessIdea] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [hasExperience, setHasExperience] = useState(false);
  const [experienceYears, setExperienceYears] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-heading text-2xl">
              {steps[currentStep].title}
            </h2>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${steps[currentStep].progress}%` }}
            />
          </div>
        </div>

        {currentStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Describe your business idea
                </label>
                <textarea
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="e.g., Online organic snack store focusing on traditional Indian recipes"
                  rows={4}
                  required
                />
                <p className="mt-1 text-sm text-gray-500">
                  AI will analyze market potential and suggest improvements
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Target Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                >
                  <option value="">Select location focus</option>
                  {cities.map((city) => (
                    <option key={city.value} value={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Business Category
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Search categories..."
                    list="categories"
                    required
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <datalist id="categories">
                    {categories.map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                  </datalist>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={hasExperience}
                      onChange={(e) => setHasExperience(e.target.checked)}
                      className="rounded border-purple-200 text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      I have prior experience in this field
                    </span>
                  </label>
                </div>

                {hasExperience && (
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select years of experience</option>
                    <option value="1-2">1-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5+">More than 5 years</option>
                  </select>
                )}
              </div>

              <button
                type="submit"
                className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale flex items-center justify-center gap-2"
              >
                Analyze My Business Idea
                <ChevronRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        )}

        {currentStep === 1 && showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Success Potential */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl">
                    Your Idea Has 82% Success Potential!
                  </h3>
                  <p className="text-gray-600">
                    Based on market data and your experience
                  </p>
                </div>
              </div>

              {/* Risk Factors */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <AlertTriangle className="w-5 h-5" />
                  <p>High competition in Mumbai (23% saturation)</p>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="font-heading text-xl mb-6">Market Insights</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Growth Projection</h4>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: '22%' }} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    22% CAGR in health foods (2024-2029)
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Recommended Structure</h4>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="font-medium">Sole Proprietorship</p>
                    <p className="text-sm text-gray-600">
                      Ideal for early-stage businesses with lower compliance needs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale flex items-center justify-center gap-2"
            >
              Continue with Sole Proprietorship
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}