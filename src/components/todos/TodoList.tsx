import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, CheckCircle2, Circle, Clock, Tag, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type Todo = {
  id: string;
  title: string;
  description: string;
  due_date: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  categories: Category[];
};

type Category = {
  id: string;
  name: string;
  color: string;
};

const STORAGE_KEY = 'todo-app-data';

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 'medium' as const,
    selectedCategories: [] as string[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      const { todos, categories } = JSON.parse(savedData);
      setTodos(todos || []);
      setCategories(categories || []);
    }
  }, []);

  const saveData = (newTodos: Todo[], newCategories: Category[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      todos: newTodos,
      categories: newCategories,
    }));
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newTodoItem: Todo = {
        id: crypto.randomUUID(),
        title: newTodo.title,
        description: newTodo.description,
        due_date: newTodo.due_date,
        priority: newTodo.priority,
        status: 'pending',
        categories: categories.filter(cat => newTodo.selectedCategories.includes(cat.id)),
      };

      const updatedTodos = [newTodoItem, ...todos];
      setTodos(updatedTodos);
      saveData(updatedTodos, categories);

      setNewTodo({
        title: '',
        description: '',
        due_date: '',
        priority: 'medium',
        selectedCategories: [],
      });
      setShowForm(false);

      toast({
        title: 'Todo added',
        description: 'Your todo has been added successfully.',
      });
    } catch (error: any) {
      toast({
        title: 'Error adding todo',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodoStatus = (todoId: string, status: Todo['status']) => {
    try {
      const updatedTodos = todos.map(todo =>
        todo.id === todoId ? { ...todo, status } : todo
      );
      setTodos(updatedTodos);
      saveData(updatedTodos, categories);
    } catch (error: any) {
      toast({
        title: 'Error updating todo',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  const priorityColors = {
    low: 'bg-emerald-500',
    medium: 'bg-blue-500',
    high: 'bg-red-500',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-white mb-1">Your Todos</h2>
          <p className="text-gray-400">Manage your tasks efficiently</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          New Todo
        </Button>
      </div>

      {showForm && (
        <div className="bg-[#2E2E2E] rounded-lg p-6 border border-gray-800">
          <form onSubmit={addTodo} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
                required
                className="bg-[#1C1C1C] border-gray-800 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">Description</Label>
              <Textarea
                id="description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
                className="bg-[#1C1C1C] border-gray-800 text-white"
              />
            </div>
            <div className="flex space-x-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-[240px] justify-start text-left font-normal',
                        'bg-[#1C1C1C] border-gray-800 text-white',
                        !newTodo.due_date && 'text-gray-500'
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {newTodo.due_date ? format(new Date(newTodo.due_date), 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={newTodo.due_date ? new Date(newTodo.due_date) : undefined}
                      onSelect={(date) =>
                        setNewTodo({ ...newTodo, due_date: date ? date.toISOString() : '' })
                      }
                      initialFocus
                      className="bg-[#2E2E2E] text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Priority</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#1C1C1C] border-gray-800 text-white"
                    >
                      <div
                        className={cn(
                          'w-3 h-3 rounded-full mr-2',
                          priorityColors[newTodo.priority]
                        )}
                      />
                      {newTodo.priority.charAt(0).toUpperCase() + newTodo.priority.slice(1)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#2E2E2E] border-gray-800">
                    <DropdownMenuItem onClick={() => setNewTodo({ ...newTodo, priority: 'low' })}>
                      <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
                      Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewTodo({ ...newTodo, priority: 'medium' })}>
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setNewTodo({ ...newTodo, priority: 'high' })}>
                      <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                      High
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="pt-4 flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="bg-transparent border-gray-800 text-gray-400 hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
              >
                {isLoading ? 'Adding...' : 'Add Todo'}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-gray-800 bg-[#2E2E2E] hover:bg-[#363636] transition-colors"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                updateTodoStatus(
                  todo.id,
                  todo.status === 'completed' ? 'pending' : 'completed'
                )
              }
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              {todo.status === 'completed' ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5" />
              )}
            </Button>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <h3
                  className={cn(
                    'font-medium text-white',
                    todo.status === 'completed' && 'line-through text-gray-500'
                  )}
                >
                  {todo.title}
                </h3>
                <div
                  className={cn(
                    'w-2 h-2 rounded-full',
                    priorityColors[todo.priority]
                  )}
                />
              </div>
              {todo.description && (
                <p className="text-sm text-gray-400">{todo.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                {todo.due_date && (
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {format(new Date(todo.due_date), 'PPP')}
                  </div>
                )}
                {todo.categories?.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Tag className="h-4 w-4" />
                    <div className="flex space-x-1">
                      {todo.categories.map((category) => (
                        <span
                          key={category.id}
                          className="inline-flex items-center rounded-full px-2 py-1 text-xs"
                          style={{ backgroundColor: category.color + '20' }}
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}