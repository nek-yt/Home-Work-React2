import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsStats({ todos, count }) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-sm mb-1">Total Items</p>
            <p className="text-2xl font-bold text-gray-900">{todos.length}</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <p className="text-gray-600 text-sm mb-1">Current Count</p>
            <p className="text-2xl font-bold text-gray-900">{count}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}