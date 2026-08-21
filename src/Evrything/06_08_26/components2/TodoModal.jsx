import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function TodoModal({ todos, completedCount }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-gray-200">
        <DialogHeader>
          <DialogTitle className="text-gray-900">Task Summary</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-sm mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900">{todos.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <p className="text-gray-600 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedCount}</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <p className="text-gray-600 text-sm mb-2">Remaining</p>
            <p className="text-3xl font-bold text-orange-600">{todos.length - completedCount}</p>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${todos.length ? (completedCount / todos.length) * 100 : 0}%` }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}