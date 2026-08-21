import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAtom, useSetAtom } from "jotai";
import { useFormik } from "formik";
import {
  AlertCircle,
  Check,
  CheckCircle2,
  FileImage,
  ImagePlus,
  Loader2,
  Pencil,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  createTodo,
  fetchTodos,
  imageBaseUrl,
  removeTodo,
  toggleTodo,
  updateTodo,
} from "./store/todoSlice";
import {
  filterAtom,
  modalAtom,
  searchAtom,
  selectedTodoAtom,
  updateTodoMetaAtom,
} from "./store/uiAtoms";

const emptyValues = { name: "", description: "", images: [] };

function TodoForm({ todo, onClose }) {
  const dispatch = useDispatch();
  const actionStatus = useSelector((state) => state?.todos?.actionStatus || "idle");

  const formik = useFormik({
    initialValues: todo
      ? {
          name: todo.name || todo.Name || "",
          description: todo.description || todo.Description || "",
          images: [],
        }
      : emptyValues,
    enableReinitialize: true,
    onSubmit: async (values, helpers) => {
      const todoId = todo?.id || todo?.Id;
      const action = todo ? updateTodo({ ...values, id: todoId }) : createTodo(values);
      const result = await dispatch(action);
      if (!result?.error) {
        helpers.resetForm();
        onClose();
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-0 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="w-full max-w-lg rounded-t-[2rem] bg-[#fffdf8] p-6 shadow-2xl sm:rounded-[2rem] sm:p-8">
        <div className="mb-7 flex items-start justify-between">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#e26d5a]">
              {todo ? "Refine task" : "New task"}
            </p>
            <h2 className="font-heading text-2xl font-bold text-[#1e293b]">
              {todo ? "Edit your focus" : "What are you making time for?"}
            </h2>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close form">
            <X />
          </Button>
        </div>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[#334155]">
              Task name
            </label>
            <Input
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="e.g. Design the next chapter"
              autoFocus
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-[#334155]">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Add a little context..."
              rows="4"
              className="flex w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#e26d5a] focus:ring-3 focus:ring-[#e26d5a]/15"
            />
          </div>
          <label
            htmlFor="images"
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-slate-300 bg-white px-4 py-3 text-sm text-slate-500 transition hover:border-[#e26d5a] hover:text-[#e26d5a]"
          >
            <ImagePlus className="size-5" />
            <span>
              {formik.values.images.length
                ? `${formik.values.images.length} image(s) selected`
                : "Attach reference images"}
            </span>
            <input
              id="images"
              name="images"
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) =>
                formik.setFieldValue("images", Array.from(event.currentTarget.files || []))
              }
            />
          </label>
          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={actionStatus === "loading"}>
              {actionStatus === "loading" && <Loader2 className="animate-spin" />}
              {todo ? "Save changes" : "Create task"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TodoCard({ todo, onEdit }) {
  const dispatch = useDispatch();
  const id = todo?.id ?? todo?.Id;
  const name = todo?.name ?? todo?.Name ?? "Untitled Task";
  const description = todo?.description ?? todo?.Description ?? "";
  const isCompleted = Boolean(todo?.isCompleted ?? todo?.IsCompleted ?? false);
  const images = todo?.images ?? todo?.Images ?? [];
  const image = images[0]?.imageName ?? images[0]?.ImageName;

  return (
    <Card className="group relative overflow-hidden border-0 bg-white shadow-[0_12px_35px_rgba(30,41,59,0.07)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(30,41,59,0.12)]">
      <div className="relative aspect-16/8 overflow-hidden bg-[#f5eee4]">
        {image ? (
          <img
            src={`${imageBaseUrl}${image}`}
            alt=""
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-[#d98c71]">
            <FileImage className="size-10 stroke-1" />
          </div>
        )}
        <Badge
          className={`absolute left-4 top-4 border-0 ${
            isCompleted ? "bg-emerald-100 text-emerald-700" : "bg-white/90 text-[#9a5b45]"
          }`}
        >
          {isCompleted ? "Completed" : "In progress"}
        </Badge>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <h3 className={`line-clamp-1 text-lg font-bold text-[#1e293b] ${isCompleted ? "line-through opacity-60" : ""}`}>
            {name}
          </h3>
          <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
            {description || "No description added yet."}
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={() => dispatch(toggleTodo(id))}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-emerald-600"
            aria-label={isCompleted ? "Mark as in progress" : "Mark as completed"}
          >
            <span
              className={`flex size-5 items-center justify-center rounded-full border ${
                isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300"
              }`}
            >
              {isCompleted && <Check className="size-3" />}
            </span>
            {isCompleted ? "Done" : "Mark done"}
          </button>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon-sm" onClick={() => onEdit(todo)} aria-label="Edit task">
              <Pencil />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-slate-400 hover:text-rose-600"
              onClick={() => dispatch(removeTodo(id))}
              aria-label="Delete task"
            >
              <Trash2 />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function TodoWorkspace() {
  const dispatch = useDispatch();

  const { items = [], status = "idle", error = null } = useSelector((state) => state?.todos || {});

  const [filter, setFilter] = useAtom(filterAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [selected, setSelected] = useAtom(selectedTodoAtom);
  const [modalOpen, setModalOpen] = useAtom(modalAtom);
  const setSelectedTodo = useSetAtom(selectedTodoAtom);
  const updateTodoMeta = useSetAtom(updateTodoMetaAtom);

  const prevItemsRef = useRef(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    if (items && items.length > 0) {
      const serialized = JSON.stringify(items);
      if (prevItemsRef.current !== serialized) {
        prevItemsRef.current = serialized;
        updateTodoMeta(items);
      }
    }
  }, [items, updateTodoMeta]);

  const visibleTodos = useMemo(() => {
    if (!Array.isArray(items)) return [];

    return items.filter((todo) => {
      const name = todo?.name ?? todo?.Name ?? "";
      const description = todo?.description ?? todo?.Description ?? "";
      const isCompleted = Boolean(todo?.isCompleted ?? todo?.IsCompleted ?? false);

      const searchMatch = `${name} ${description}`
        .toLowerCase()
        .includes((search || "").toLowerCase());
      const filterMatch =
        filter === "all" || (filter === "done" ? isCompleted : !isCompleted);

      return filterMatch && searchMatch;
    });
  }, [items, filter, search]);

  const openForm = (todo = null) => {
    setSelectedTodo(todo);
    setModalOpen(true);
  };
  const closeForm = () => {
    setSelected(null);
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-slate-800">
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <header className="mb-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f3d8c9] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#a9513e]">
              <Sparkles className="size-3.5" /> Little wins, daily
            </div>
            <h1 className="max-w-xl font-heading text-4xl font-black tracking-tight text-[#1e293b] sm:text-5xl">
              Make space for<br />
              <span className="text-[#e26d5a]">good work.</span>
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              A calm corner for the things you want to move forward.
            </p>
          </div>
          <Button
            size="lg"
            className="h-12 rounded-xl bg-[#e26d5a] px-5 text-white shadow-lg shadow-[#e26d5a]/20 hover:bg-[#d35e4b]"
            onClick={() => openForm()}
          >
            <Plus /> Add a task
          </Button>
        </header>

        <div className="mb-6 flex flex-col gap-4 border-b border-[#e5ded3] pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-1 rounded-xl bg-white/70 p-1">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`rounded-lg px-3 py-2 text-xs font-bold ${
                filter === "all" ? "bg-[#1e293b] text-white" : "text-slate-500"
              }`}
            >
              All
            </button>
            <button
              type="button"
              onClick={() => setFilter("open")}
              className={`rounded-lg px-3 py-2 text-xs font-bold ${
                filter === "open" ? "bg-[#1e293b] text-white" : "text-slate-500"
              }`}
            >
              In progress
            </button>
            <button
              type="button"
              onClick={() => setFilter("done")}
              className={`rounded-lg px-3 py-2 text-xs font-bold ${
                filter === "done" ? "bg-[#1e293b] text-white" : "text-slate-500"
              }`}
            >
              Completed
            </button>
          </div>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks"
              className="h-10 rounded-xl border-0 bg-white pl-9 shadow-sm"
            />
          </div>
        </div>

        {status === "loading" && (
          <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500">
            <Loader2 className="size-5 animate-spin text-[#e26d5a]" /> Gathering your tasks...
          </div>
        )}

        {status === "failed" && (
          <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            <AlertCircle className="mt-0.5 size-5 shrink-0" />
            <div>
              <p className="font-bold">The list could not load.</p>
              <p className="mt-1">{error}</p>
              <Button variant="outline" size="sm" className="mt-3" onClick={() => dispatch(fetchTodos())}>
                Try again
              </Button>
            </div>
          </div>
        )}

        {status === "succeeded" && (
          visibleTodos.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleTodos.map((todo) => (
                <TodoCard key={todo?.id ?? todo?.Id} todo={todo} onEdit={openForm} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#d9cfc1] bg-white/45 py-16 text-center">
              <CheckCircle2 className="mx-auto size-10 text-[#d4a18d]" />
              <h2 className="mt-4 font-heading text-xl font-bold text-[#1e293b]">Nothing here yet</h2>
              <p className="mt-2 text-sm text-slate-500">Add a task and give your next win a place to start.</p>
              <Button className="mt-5 bg-[#e26d5a] hover:bg-[#d35e4b]" onClick={() => openForm()}>
                <Plus /> Create first task
              </Button>
            </div>
          )
        )}
      </div>

      {modalOpen && <TodoForm todo={selected} onClose={closeForm} />}
    </main>
  );
}