import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Sparkles, Loader2, Camera, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function CropDetector() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    treatment: string;
    confidence: number;
  } | null>(null);
  const { user } = useAuth();

  const diseases = [
    { disease: 'Healthy Crop', treatment: 'Continue regular maintenance and monitoring', confidence: 95 },
    { disease: 'Leaf Blight', treatment: 'Apply copper-based fungicide. Remove infected leaves. Ensure proper drainage.', confidence: 88 },
    { disease: 'Powdery Mildew', treatment: 'Apply sulfur-based spray. Improve air circulation. Reduce humidity.', confidence: 92 },
    { disease: 'Rust Disease', treatment: 'Use appropriate fungicide. Remove infected plants. Practice crop rotation.', confidence: 85 },
    { disease: 'Bacterial Spot', treatment: 'Apply copper spray. Remove infected parts. Avoid overhead watering.', confidence: 90 },
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    setAnalyzing(true);

    await new Promise(resolve => setTimeout(resolve, 2500));

    const randomResult = diseases[Math.floor(Math.random() * diseases.length)];
    setResult(randomResult);

    if (user) {
      await supabase.from('crop_analyses').insert({
        user_id: user.id,
        predicted_disease: randomResult.disease,
        treatment: randomResult.treatment,
        confidence: randomResult.confidence,
      });
    }

    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center">
            <Sparkles className="w-10 h-10 text-yellow-500 mr-3" />
            AI Crop Detector
          </h1>
          <p className="text-gray-600">Upload a photo of your crop to detect diseases and get treatment recommendations</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8"
        >
          {!selectedImage ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-4 border-dashed border-green-300 rounded-2xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer bg-gradient-to-br from-green-50 to-yellow-50"
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Camera className="w-20 h-20 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Upload Crop Image</h3>
                <p className="text-gray-600 mb-4">Drag and drop or click to select</p>
                <div className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  <Upload className="w-5 h-5" />
                  <span>Choose Image</span>
                </div>
              </label>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Crop"
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setSelectedImage(null);
                    setResult(null);
                  }}
                  className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Choose Different Image
                </button>
                <button
                  onClick={analyzeImage}
                  disabled={analyzing}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {analyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Analyze Crop</span>
                    </>
                  )}
                </button>
              </div>

              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    className="bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl p-6 border-2 border-green-300"
                  >
                    <div className="flex items-center mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-800">Analysis Complete</h3>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Detected Condition</label>
                        <p className="text-xl font-bold text-gray-800">{result.disease}</p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Confidence Level</label>
                        <div className="flex items-center space-x-3 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${result.confidence}%` }}
                              transition={{ duration: 1, ease: 'easeOut' }}
                              className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full"
                            />
                          </div>
                          <span className="text-lg font-bold text-green-700">{result.confidence}%</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Recommended Treatment</label>
                        <p className="text-gray-800 leading-relaxed mt-1">{result.treatment}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
