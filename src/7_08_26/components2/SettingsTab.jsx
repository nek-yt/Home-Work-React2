import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SettingsStats from './SettingsStats';
import SettingsActions from './SettingsAction';

export default function SettingsTab({ todos, count, onResetAll, onRandomCount }) {
  return (
    <div className="space-y-6">
      <SettingsStats todos={todos} count={count} />
      <SettingsActions onResetAll={onResetAll} onRandomCount={onRandomCount} />
    </div>
  );
}