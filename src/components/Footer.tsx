import { Wheat } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-800 to-green-700 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Wheat className="w-6 h-6" />
            <span className="text-lg font-semibold">SmartAgro</span>
          </div>

          <p className="text-green-100 text-sm text-center md:text-left">
            © 2025 SmartAgro | Empowering Farmers with AI
          </p>

          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-2xl">🌱</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
