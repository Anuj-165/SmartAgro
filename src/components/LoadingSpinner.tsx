import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className="w-12 h-12 text-green-600 animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
