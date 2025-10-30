import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, AlertCircle, FileText, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function HelpPortal() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [issueType, setIssueType] = useState('crop_disease');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user } = useAuth();

  const issueTypes = [
    { value: 'crop_disease', label: 'Crop Disease' },
    { value: 'pest_control', label: 'Pest Control' },
    { value: 'irrigation', label: 'Irrigation Issues' },
    { value: 'soil_health', label: 'Soil Health' },
    { value: 'equipment', label: 'Equipment Breakdown' },
    { value: 'financial', label: 'Financial Assistance' },
    { value: 'other', label: 'Other' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Mock form submission (simulate API delay)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // ✅ On success, show confirmation
      setSuccess(true);
      setName('');
      setLocation('');
      setIssueType('crop_disease');
      setDescription('');

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting help request:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <AlertCircle className="w-10 h-10 text-yellow-500 mr-3" />
            Help & NGO Portal
          </h1>
          <p className="text-gray-600">
            Need assistance? Connect with NGOs and agricultural experts
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-green-50 border-2 border-green-300 rounded-xl p-4 flex items-center space-x-3"
            >
              <CheckCircle className="w-6 h-6 text-green-600" />
              <p className="text-green-800 font-medium">
                Your request has been submitted successfully! Our team will contact you soon.
              </p>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  placeholder="Village, District, State"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
              >
                {issueTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none"
                placeholder="Describe your issue in detail..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <span>Sending Request...</span>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Request</span>
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-200">
            <h3 className="font-bold text-gray-800 mb-3">What happens next?</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>Your request will be reviewed by our team within 24 hours</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>We'll connect you with the nearest NGO or agricultural expert</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                <span>You'll receive updates via SMS and email</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
