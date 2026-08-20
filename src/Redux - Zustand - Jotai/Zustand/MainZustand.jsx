import React, { useEffect, useState } from "react";
import { useTodoStore, imageBaseUrl } from "./store/storeZustand";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Trash2, Edit3, Image as ImageIcon, Loader2 } from "lucide-react";

function App() {
  const { data, loading, getTodos, deleteTodo, addTodo, editTodo } = useTodoStore();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [editImages, setEditImages] = useState(null);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const handleAdd = async (e) => {
    e.preventDefault();
    await addTodo({
      name,
      description,
      isCompleted: false,
      images,
    });
    setName("");
    setDescription("");
    setImages(null);
    setIsAddOpen(false);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditName(todo.name);
    setEditDesc(todo.description);
    setEditCompleted(todo.isCompleted);
    setIsEditOpen(true);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await editTodo({
      id: editId,
      name: editName,
      description: editDesc,
      isCompleted: editCompleted,
      images: editImages,
    });
    setIsEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-6 md:p-12">
      <div className="max-w-5xl mx-auto space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Task Manager</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Zustand state management with Axios & shadcn/ui
            </p>
          </div>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="shadow-sm gap-2">
                <Plus className="w-4 h-4" /> Add New Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create Task</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAdd} className="space-y-4 py-2">
                <Input
                  type="text"
                  placeholder="Task Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <Input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
                <div className="grid w-full items-center gap-1.5">
                  <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <ImageIcon className="w-3.5 h-3.5" /> Attach Images
                  </label>
                  <Input
                    type="file"
                    multiple
                    onChange={(e) => setImages(e.target.files)}
                  />
                </div>
                <DialogFooter className="mt-4">
                  <Button type="button" variant="ghost" onClick={() => setIsAddOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Task</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Task</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleEdit} className="space-y-4 py-2">
              <Input
                type="text"
                placeholder="Task Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Description"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                required
              />
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <Checkbox
                  id="edit-completed"
                  checked={editCompleted}
                  onCheckedChange={(checked) => setEditCompleted(checked)}
                />
                <label htmlFor="edit-completed" className="text-sm font-medium cursor-pointer">
                  Mark as Completed
                </label>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="w-3.5 h-3.5" /> Replace Images
                </label>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => setEditImages(e.target.files)}
                />
              </div>
              <DialogFooter className="mt-4">
                <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {loading && (
          <div className="flex justify-center items-center py-12 text-muted-foreground gap-2">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Fetching task records...</span>
          </div>
        )}

        {!loading && data?.length === 0 && (
          <div className="text-center py-16 border border-dashed rounded-lg">
            <p className="text-muted-foreground text-sm">No tasks found. Create one above to get started.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {data &&
            data.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base font-semibold line-clamp-1">{item.name}</CardTitle>
                    <Badge variant={item.isCompleted ? "default" : "secondary"} className="shrink-0">
                      {item.isCompleted ? "Done" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3 flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>

                  {item.images && item.images.length > 0 && (
                    <div className="overflow-hidden rounded-md border bg-muted">
                      <img
                        src={`${imageBaseUrl}${item.images[0].imageName}`}
                        alt={item.name}
                        className="w-full h-36 object-cover hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                </CardContent>

                <CardFooter className="pt-3 border-t flex justify-end gap-2 bg-slate-50/50 dark:bg-slate-900/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => startEdit(item)}
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => deleteTodo(item.id)}
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>

      </div>
    </div>
  );
}

export default App;