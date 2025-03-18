import React, { useState } from 'react';
import { Brain, Building2, Search, FileCheck, X } from 'lucide-react';

export function BusinessReadinessCheck() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAnalysis(true);
  };

  return (
    <div className="glass-card rounded-2xl p-8 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Brain className="w-8 h-8 text-primary" />
          <h3 className="font-heading text-2xl">
            Is Your Business Idea Ready?
          </h3>
        </div>
        {showAnalysis && (
          <button
            onClick={() => {
              setBusinessIdea('');
              setShowAnalysis(false);
            }}
            className="text-charcoal/60 hover:text-charcoal"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Describe your idea (e.g., 'Organic Snack Brand')"
            className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
            value={businessIdea}
            onChange={(e) => setBusinessIdea(e.target.value)}
          />
        </div>

        {showAnalysis && (
          <div className="space-y-4 bg-purple-50/50 p-6 rounded-xl border border-purple-100 max-h-[500px] overflow-y-auto">
            <div className="flex items-start gap-3">
              <Building2 className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Market Size</h4>
                <div className="h-2 bg-purple-100 rounded-full mt-2">
                  <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: '70%' }}
                  ></div>
                </div>
                <p className="text-charcoal/70 mt-1">
                  ₹800 Cr | Growth: 22% YoY
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Search className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Competition Analysis</h4>
                <p className="text-charcoal/70">Medium saturation in Mumbai</p>
                <p className="text-success text-sm">
                  High demand in Tier 2 cities
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileCheck className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold">Required Licenses</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  <button
                    className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    title="Click for state-wise rules"
                  >
                    GST
                  </button>
                  <button
                    className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    title="Click for state-wise rules"
                  >
                    FSSAI
                  </button>
                  <button
                    className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm hover:bg-purple-200 transition-colors"
                    title="Click for state-wise rules"
                  >
                    Udyam
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 text-primary mt-1">🎯</div>
              <div>
                <h4 className="font-semibold">Risk Assessment</h4>
                <div className="mt-2 h-2 bg-purple-100 rounded-full">
                  <div
                    className="h-2 bg-success rounded-full"
                    style={{ width: '30%' }}
                  ></div>
                </div>
                <p className="text-success text-sm mt-1">Low Risk</p>
              </div>
            </div>
          </div>
        )}

        {!showAnalysis ? (
          <button
            type="submit"
            className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale"
          >
            Let's Find Out
          </button>
        ) : (
          <a
            href="#pricing"
            className="block w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale text-center"
          >
            Proceed to Registration
          </a>
        )}

        <p className="text-sm text-center text-charcoal/60">
          Latest data from trusted sources
        </p>
      </form>
    </div>
  );
}
