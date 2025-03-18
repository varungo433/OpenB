import React, { useState } from 'react';
import { MessageSquare, X, Send, Paperclip } from 'lucide-react';

export function CAChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 gradient-bg text-white p-4 rounded-full shadow-lg hover-scale"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-8 w-96 bg-white rounded-xl shadow-xl">
          <div className="p-4 border-b flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-medium">CA</span>
              </div>
              <div>
                <h3 className="font-medium">Rohit S.</h3>
                <p className="text-sm text-gray-600">Certified CA • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 p-4 overflow-y-auto space-y-4">
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                Need PAN front/back
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                GST status?
              </button>
              <button className="px-3 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200">
                Document requirements
              </button>
            </div>

            {/* Messages */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-sm font-medium">CA</span>
                </div>
                <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                  <p>Hi! I'm reviewing your GST application. Could you please share your business address proof?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <Paperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button className="text-primary hover:text-primary-dark">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}