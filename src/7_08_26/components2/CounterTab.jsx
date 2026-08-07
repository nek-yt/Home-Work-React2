import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Minus } from 'lucide-react';
import CounterStats from './CounterStats';

export default function CounterTab({ count, onCountChange }) {
  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900">Counter Practice</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-8">
            {count}
          </div>
          <div className="flex gap-4">
            <Button
              onClick={() => onCountChange(count - 1)}
              className="bg-red-500 hover:bg-red-600 text-white px-8 h-12"
              size="lg"
            >
              <Minus className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onCountChange(0)}
              variant="outline"
              className="border-gray-300 text-gray-900 hover:bg-gray-100 px-8 h-12"
              size="lg"
            >
              Reset
            </Button>
            <Button
              onClick={() => onCountChange(count + 1)}
              className="bg-green-500 hover:bg-green-600 text-white px-8 h-12"
              size="lg"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <CounterStats count={count} />
    </div>
  );
}