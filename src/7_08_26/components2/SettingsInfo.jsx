import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsInfo() {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Info</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-blue-50 p-4 rounded-lg text-sm text-gray-700 border border-blue-200">
          <p className="mb-3 font-semibold text-gray-900">This is a practice app built with:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>React & Hooks</li>
            <li>shadcn/ui Components</li>
            <li>Tailwind CSS</li>
            <li>Lucide Icons</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}