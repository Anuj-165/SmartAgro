import { motion } from 'framer-motion';
import { TrendingUp, Cloud, AlertTriangle, Droplets, Sun, Wind } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export function Dashboard() {
  const { user } = useAuth();

  const cropPrices = [
    { name: 'Wheat', price: 2450, change: '+5.2%', trend: 'up' },
    { name: 'Rice', price: 3200, change: '+2.8%', trend: 'up' },
    { name: 'Corn', price: 1850, change: '-1.5%', trend: 'down' },
    { name: 'Soybeans', price: 4100, change: '+7.3%', trend: 'up' },
    { name: 'Cotton', price: 5600, change: '-0.8%', trend: 'down' },
    { name: 'Sugarcane', price: 2900, change: '+3.1%', trend: 'up' },
  ];

  const alerts = [
    { type: 'warning', message: 'Heavy rainfall expected in next 48 hours', time: '2 hours ago' },
    { type: 'info', message: 'Optimal time for wheat harvesting this week', time: '5 hours ago' },
    { type: 'danger', message: 'Pest outbreak reported in nearby region', time: '1 day ago' },
  ];

  const weather = {
    temp: 28,
    humidity: 65,
    windSpeed: 12,
    condition: 'Partly Cloudy',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.name || 'Farmer'}!
          </h1>
          <p className="text-gray-600">Here's your farming overview for today</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="w-6 h-6 text-green-600 mr-2" />
                  Live Crop Prices
                </h2>
                <span className="text-sm text-gray-500">Updated 5 min ago</span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {cropPrices.map((crop, index) => (
                  <motion.div
                    key={crop.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gradient-to-br from-green-50 to-yellow-50 p-4 rounded-xl border border-green-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                      <span
                        className={`text-sm font-medium ${
                          crop.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {crop.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">₹{crop.price}/quintal</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center">
                <Cloud className="w-6 h-6 mr-2" />
                Weather
              </h2>
            </div>

            <div className="text-center mb-6">
              <Sun className="w-20 h-20 mx-auto mb-4 opacity-90" />
              <p className="text-5xl font-bold mb-2">{weather.temp}°C</p>
              <p className="text-blue-100 text-lg">{weather.condition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <Droplets className="w-5 h-5 mb-2" />
                <p className="text-sm text-blue-100">Humidity</p>
                <p className="text-xl font-bold">{weather.humidity}%</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
                <Wind className="w-5 h-5 mb-2" />
                <p className="text-sm text-blue-100">Wind</p>
                <p className="text-xl font-bold">{weather.windSpeed} km/h</p>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
            <AlertTriangle className="w-6 h-6 text-yellow-600 mr-2" />
            Recent Alerts
          </h2>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`p-4 rounded-xl border-l-4 ${
                  alert.type === 'danger'
                    ? 'bg-red-50 border-red-500'
                    : alert.type === 'warning'
                    ? 'bg-yellow-50 border-yellow-500'
                    : 'bg-blue-50 border-blue-500'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-gray-800 font-medium flex-1">{alert.message}</p>
                  <span className="text-sm text-gray-500 ml-4">{alert.time}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
