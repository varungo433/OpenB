import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, X, BarChart, MapPin, FileCheck } from 'lucide-react';

export function AIValidator() {
  const [businessIdea, setBusinessIdea] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handleReset = () => {
    setBusinessIdea('');
    setShowResults(false);
  };

  return (
    <section id="ai-validator" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading mb-4">
            Get Your Business Readiness Report in 60 Seconds
          </h2>
          <p className="text-xl text-charcoal/70">
            Our AI analyzes market data from IBEF, Statista, and government sources
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8 text-primary" />
                <h3 className="font-heading text-2xl">AI Validator</h3>
              </div>
              {showResults && (
                <button
                  onClick={handleReset}
                  className="text-charcoal/60 hover:text-charcoal"
                >
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={businessIdea}
                  onChange={(e) => setBusinessIdea(e.target.value)}
                  placeholder="Describe your business idea (e.g., 'Online Organic Snack Store')"
                  className="w-full px-4 py-3 rounded-xl border border-purple-200 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-purple-50/50 rounded-xl p-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <BarChart className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Market Size & Growth</h4>
                        <div className="h-2 bg-purple-100 rounded-full mt-2">
                          <div
                            className="h-2 bg-primary rounded-full"
                            style={{ width: '70%' }}
                          />
                        </div>
                        <p className="text-charcoal/70 mt-1">
                          ₹800 Cr | Growth: 22% YoY
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-6 h-6 text-primary mt-1" />
                      <div>
                        <h4 className="font-semibold">Competition Analysis</h4>
                        <p className="text-charcoal/70">
                          Medium saturation in Mumbai
                        </p>
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
                          <span className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm">
                            GST
                          </span>
                          <span className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm">
                            FSSAI
                          </span>
                          <span className="bg-purple-100 text-primary px-2 py-1 rounded-full text-sm">
                            Udyam
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale">
                    Proceed to Registration
                  </button>
                </motion.div>
              )}

              {!showResults && (
                <button
                  type="submit"
                  className="w-full gradient-bg text-white py-4 rounded-xl font-semibold hover-scale"
                >
                  Analyze My Idea
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}