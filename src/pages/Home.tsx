import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, Cloud, Shield, TrendingUp, Users, Sprout } from 'lucide-react';

export function Home() {
  const features = [
    {
      icon: Brain,
      title: 'AI Crop Detection',
      description: 'Advanced machine learning to identify crop diseases and pests instantly',
    },
    {
      icon: Cloud,
      title: 'Real-Time Weather',
      description: 'Get accurate weather forecasts and alerts for better planning',
    },
    {
      icon: Shield,
      title: 'Smart Alerts',
      description: 'Receive timely notifications about potential threats to your crops',
    },
    {
      icon: TrendingUp,
      title: 'Market Prices',
      description: 'Stay updated with latest crop prices and market trends',
    },
    {
      icon: Users,
      title: 'NGO Support',
      description: 'Connect with NGOs and get help when you need it most',
    },
    {
      icon: Sprout,
      title: 'Soil Advisory',
      description: 'Get personalized recommendations for fertilizers and irrigation',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-green-50">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-yellow-600 bg-clip-text text-transparent">
                Empowering Farmers
              </span>
              <br />
              <span className="text-gray-800">with AI</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            SmartAgro combines cutting-edge artificial intelligence with agricultural expertise to help farmers
            make informed decisions, detect crop diseases early, and maximize yields. Join thousands of farmers
            already benefiting from smart agriculture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Link
              to="/signup"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-green-700 rounded-xl font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl border-2 border-green-600"
            >
              Login
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="bg-gradient-to-br from-green-100 to-yellow-100 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <feature.icon className="w-8 h-8 text-green-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-green-600 to-yellow-600 p-12 rounded-3xl shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farming?
            </h2>
            <p className="text-green-50 text-lg mb-8 max-w-2xl mx-auto">
              Join SmartAgro today and experience the future of agriculture. Get instant access to AI-powered
              tools, expert advice, and a supportive community.
            </p>
            <Link
              to="/signup"
              className="inline-block px-10 py-4 bg-white text-green-700 rounded-xl font-bold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg"
            >
              Start Your Journey
            </Link>
          </div>
        </motion.div>
      </motion.section>
    </div>
  );
}
