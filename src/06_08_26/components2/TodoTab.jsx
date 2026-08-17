import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2, Plus } from 'lucide-react';
import TodoModal from './TodoModal';

export default function TodoTab({ 
  todos, 
  newTodo, 
  onNewTodoChange, 
  onAddTodo, 
  onToggleTodo, 
  onDeleteTodo 
}) {
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="space-y-6">
      <Card className="bg-white border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-gray-900 flex justify-between items-center">
            <span>Tasks</span>
            <span className="text-sm font-normal text-gray-500">
              {completedCount} of {todos.length} completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new task..."
              value={newTodo}
              onChange={(e) => onNewTodoChange(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddTodo()}
              className="bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
            />
            <Button 
              onClick={onAddTodo}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No tasks yet. Add one to get started!</p>
            ) : (
              todos.map(todo => (
                <div 
                  key={todo.id} 
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group border border-gray-200"
                >
                  <Checkbox
                    checked={todo.completed}
                    onCheckedChange={() => onToggleTodo(todo.id)}
                    className="border-gray-300"
                  />
                  <span 
                    className={`flex-1 text-sm ${
                      todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-900'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <TodoModal todos={todos} completedCount={completedCount} />
    </div>
  );
}