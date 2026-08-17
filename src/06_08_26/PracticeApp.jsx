import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TodoTab from './components2/TodoTab';
import CounterTab from './components2/CounterTab';
import SettingsTab from './components2/SettingsTab';

export default function PracticeApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React', completed: false },
    { id: 2, text: 'Practice JSX', completed: true },
    { id: 3, text: 'Master Tailwind', completed: false }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [count, setCount] = useState(0);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const resetAll = () => {
    setTodos([]);
    setNewTodo('');
    setCount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">Practice Lab</h1>
          <p className="text-gray-500">React Components & State Management</p>
        </div>

        <Tabs defaultValue="todo" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gray-100 border border-gray-200">
            <TabsTrigger value="todo" className="text-sm font-medium text-gray-700 data-[state=active]:text-blue-600">Todo List</TabsTrigger>
            <TabsTrigger value="counter" className="text-sm font-medium text-gray-700 data-[state=active]:text-blue-600">Counter</TabsTrigger>
            <TabsTrigger value="settings" className="text-sm font-medium text-gray-700 data-[state=active]:text-blue-600">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="todo">
            <TodoTab 
              todos={todos}
              newTodo={newTodo}
              onNewTodoChange={setNewTodo}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onDeleteTodo={deleteTodo}
            />
          </TabsContent>

          <TabsContent value="counter">
            <CounterTab 
              count={count}
              onCountChange={setCount}
            />
          </TabsContent>

          <TabsContent value="settings">
            <SettingsTab 
              todos={todos}
              count={count}
              onResetAll={resetAll}
              onRandomCount={() => setCount(Math.floor(Math.random() * 100) - 50)}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}