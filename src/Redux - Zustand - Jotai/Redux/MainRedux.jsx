import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  deleteTodo,
  addTodo,
  editTodo,
  imageBaseUrl,
} from "./store/todoSlice";

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
  DialogFooter,
} from "@/components/ui/dialog";

function App() {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.todos);

  // Add State
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState(null);

  // Edit State
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editCompleted, setEditCompleted] = useState(false);
  const [editImages, setEditImages] = useState(null);

  useEffect(() => {
    dispatch(getTodos());
  }, [dispatch]);

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      addTodo({
        name,
        description,
        isCompleted: false,
        images,
      })
    );
    setName("");
    setDescription("");
    setImages(null);
  };

  const startEdit = (todo) => {
    setEditId(todo.id);
    setEditName(todo.name);
    setEditDesc(todo.description);
    setEditCompleted(todo.isCompleted);
    setIsEditOpen(true);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(
      editTodo({
        id: editId,
        name: editName,
        description: editDesc,
        isCompleted: editCompleted,
        images: editImages,
      })
    );
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Todo App (Redux)</h1>

      {/* Add Form */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Task</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdd} className="space-y-4">
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
            <Input
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
            <Button type="submit">Add Task</Button>
          </form>
        </CardContent>
      </Card>

      {/* Edit Dialog (shadcn Modal) */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
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
            <div className="flex items-center space-x-2">
              <Checkbox
                id="completed"
                checked={editCompleted}
                onCheckedChange={(checked) => setEditCompleted(checked)}
              />
              <label htmlFor="completed" className="text-sm font-medium">
                Completed
              </label>
            </div>
            <Input
              type="file"
              multiple
              onChange={(e) => setEditImages(e.target.files)}
            />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Todo Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Tasks</h2>

        {loading && <p className="text-muted-foreground">Loading tasks...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data &&
            data.map((item) => (
              <Card key={item.id} className="flex flex-col justify-between">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <Badge variant={item.isCompleted ? "default" : "secondary"}>
                      {item.isCompleted ? "Done" : "Pending"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.images && item.images.length > 0 && (
                    <img
                      src={`${imageBaseUrl}${item.images[0].imageName}`}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded-md border"
                    />
                  )}
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => startEdit(item)}>
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(deleteTodo(item.id))}
                  >
                    Delete
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