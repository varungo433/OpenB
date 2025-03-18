import React from 'react';
import { CheckCircle2, Clock, AlertCircle, Upload, MessageSquare } from 'lucide-react';

export function ApplicationStatus() {
  return (
    <div className="space-y-6">
      {/* Priority Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-heading text-xl mb-4">Current Application</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Organic Foods Pvt</h3>
              <p className="text-sm text-gray-600">Application #ORG123456</p>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <Clock className="w-5 h-5" />
              <span className="text-sm font-medium">80% Complete</span>
            </div>
          </div>

          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-primary" style={{ width: '80%' }} />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="text-success flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              MCA Filing
            </span>
            <span className="text-amber-500 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              GST (Pending)
            </span>
          </div>
        </div>
      </div>

      {/* CA Updates */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-heading text-xl mb-4">CA Updates</h2>
        <div className="border rounded-lg p-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-5 h-5 text-amber-500 mt-1" />
            <div>
              <p className="text-gray-900">Please share partnership deed (if any)</p>
              <div className="mt-4 flex items-center gap-4">
                <button className="flex items-center gap-2 text-primary hover:text-primary-dark">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm">Upload Document</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">Add Comment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Document Tracker */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="font-heading text-xl mb-4">Document Tracker</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <span>PAN Card</span>
            </div>
            <span className="text-sm text-success">Approved</span>
          </div>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>Aadhaar Card</span>
            </div>
            <span className="text-sm text-amber-500">Under Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}