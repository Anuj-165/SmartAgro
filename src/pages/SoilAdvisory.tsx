import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, Sprout, MapPin, ArrowRight } from 'lucide-react';

export function SoilAdvisory() {
  const [region, setRegion] = useState('');
  const [cropType, setCropType] = useState('');
  const [showResults, setShowResults] = useState(false);

  const regions = [
    'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Bihar',
    'West Bengal', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh'
  ];

  const crops = [
    'Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Corn',
    'Soybeans', 'Barley', 'Mustard', 'Potato', 'Tomato'
  ];

  const getRecommendations = () => {
    const fertilizerRecommendations = {
      Wheat: { npk: '120:60:40 kg/ha', organic: 'Farmyard manure 10-15 tons/ha', micronutrients: 'Zinc Sulfate 25 kg/ha' },
      Rice: { npk: '120:60:40 kg/ha', organic: 'Green manure or compost 10 tons/ha', micronutrients: 'Iron and Zinc chelates' },
      Cotton: { npk: '120:60:60 kg/ha', organic: 'Vermicompost 5 tons/ha', micronutrients: 'Boron 10 kg/ha' },
      Sugarcane: { npk: '150:60:60 kg/ha', organic: 'Press mud 10 tons/ha', micronutrients: 'Manganese Sulfate 20 kg/ha' },
      Corn: { npk: '150:75:40 kg/ha', organic: 'Farmyard manure 12 tons/ha', micronutrients: 'Zinc and Copper' },
    };

    const irrigationRecommendations = {
      Wheat: { frequency: '5-6 irrigations', timing: 'CRI, tillering, jointing, flowering, dough', amount: '5-6 cm per irrigation' },
      Rice: { frequency: 'Continuous flooding', timing: 'Maintain 5 cm standing water', amount: '12-15 cm total depth' },
      Cotton: { frequency: '8-10 irrigations', timing: 'Square formation, flowering, boll development', amount: '6-7 cm per irrigation' },
      Sugarcane: { frequency: '10-12 irrigations', timing: 'Every 15-20 days', amount: '7-8 cm per irrigation' },
      Corn: { frequency: '4-5 irrigations', timing: 'Knee high, tasseling, silking, grain filling', amount: '5-6 cm per irrigation' },
    };

    const defaultFertilizer = { npk: '100:50:50 kg/ha', organic: 'Compost 8-10 tons/ha', micronutrients: 'As per soil test' };
    const defaultIrrigation = { frequency: '6-8 irrigations', timing: 'Critical growth stages', amount: '5-6 cm per irrigation' };

    return {
      fertilizer: fertilizerRecommendations[cropType as keyof typeof fertilizerRecommendations] || defaultFertilizer,
      irrigation: irrigationRecommendations[cropType as keyof typeof irrigationRecommendations] || defaultIrrigation,
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const recommendations = showResults ? getRecommendations() : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Sprout className="w-10 h-10 text-green-600 mr-3" />
            Soil & Crop Advisory
          </h1>
          <p className="text-gray-600">Get personalized recommendations for fertilizers and irrigation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Region
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={region}
                  onChange={(e) => {
                    setRegion(e.target.value);
                    setShowResults(false);
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Select your region</option>
                  {regions.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Crop Type
              </label>
              <div className="relative">
                <Sprout className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={cropType}
                  onChange={(e) => {
                    setCropType(e.target.value);
                    setShowResults(false);
                  }}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all appearance-none bg-white"
                >
                  <option value="">Select crop type</option>
                  {crops.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg flex items-center justify-center space-x-2"
            >
              <span>Get Recommendations</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </form>

          <AnimatePresence>
            {recommendations && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 0.2 }}
                className="mt-8 space-y-6"
              >
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-300">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Sprout className="w-6 h-6 text-green-600 mr-2" />
                    Fertilizer Recommendations
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">NPK Ratio</h4>
                      <p className="text-gray-800">{recommendations.fertilizer.npk}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Organic Fertilizer</h4>
                      <p className="text-gray-800">{recommendations.fertilizer.organic}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Micronutrients</h4>
                      <p className="text-gray-800">{recommendations.fertilizer.micronutrients}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-300">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                    <Droplets className="w-6 h-6 text-blue-600 mr-2" />
                    Irrigation Guidelines
                  </h3>

                  <div className="space-y-4">
                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Frequency</h4>
                      <p className="text-gray-800">{recommendations.irrigation.frequency}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Critical Stages</h4>
                      <p className="text-gray-800">{recommendations.irrigation.timing}</p>
                    </div>

                    <div className="bg-white rounded-xl p-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Water Depth</h4>
                      <p className="text-gray-800">{recommendations.irrigation.amount}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> These are general recommendations for {cropType} in {region}.
                    For precise application rates, please conduct a soil test and consult with local agricultural experts.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
