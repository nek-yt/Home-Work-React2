import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsActions({ onResetAll, onRandomCount }) {
  return (
    <Card className="bg-white border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle className="text-gray-900">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button 
          onClick={onResetAll}
          className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900"
        >
          Reset All Data
        </Button>
        <Button 
          onClick={onRandomCount}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Random Count
        </Button>
      </CardContent>
    </Card>
  );
}