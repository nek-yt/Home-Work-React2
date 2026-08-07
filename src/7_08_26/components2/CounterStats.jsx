import { Card, CardContent } from '@/components/ui/card';

export default function CounterStats({ count }) {
  const status = count > 0 ? '📈 Positive' : count < 0 ? '📉 Negative' : '➡️ Neutral';
  const type = count % 2 === 0 ? '🔢 Even' : '🔤 Odd';

  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardContent className="pt-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
            <p className="text-gray-600 text-xs mb-2 font-semibold">STATUS</p>
            <p className="text-gray-900 font-semibold">
              {status}
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200 text-center">
            <p className="text-gray-600 text-xs mb-2 font-semibold">TYPE</p>
            <p className="text-gray-900 font-semibold">{type}</p>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200 text-center">
            <p className="text-gray-600 text-xs mb-2 font-semibold">ABSOLUTE</p>
            <p className="text-gray-900 font-semibold">{Math.abs(count)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}