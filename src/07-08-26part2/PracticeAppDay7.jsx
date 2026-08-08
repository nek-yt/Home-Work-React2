import React, { useState, useEffect, useMemo } from 'react';
import { useJobStore } from './components/store/todo';
import { 
  Plus, 
  Search, 
  Trash2, 
  Users, 
  Pencil,
  X,
  UserPlus,
  UserPen
} from 'lucide-react';

function MemberModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    job: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ name: '', age: '', job: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim() && formData.job.trim()) {
      onSave({
        ...formData,
        age: Number(formData.age) || 0,
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-slate-900 text-white rounded-lg">
              {initialData ? <UserPen className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                {initialData ? 'Edit Member' : 'Add New Member'}
              </h2>
              <p className="text-xs text-slate-500">
                {initialData ? 'Update profile details' : 'Enter details to add a new profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              placeholder="e.g. Muhammad Farooq"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Age
            </label>
            <input
              type="number"
              required
              min="18"
              max="100"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              placeholder="28"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Job Title
            </label>
            <input
              type="text"
              required
              value={formData.job}
              onChange={(e) => setFormData({ ...formData, job: e.target.value })}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              {initialData ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function PractiveAppDay7() {
  const { jobs, addUI, editUI, deleteUI } = useJobStore();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredJobs = useMemo(() => {
    return jobs.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.job.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [jobs, searchTerm]);

  const handleOpenAdd = () => {
    setSelectedJob(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleSave = (data) => {
    if (selectedJob) {
      editUI(selectedJob.id, data);
    } else {
      addUI(data);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-slate-900 p-4 sm:p-8 md:p-12">
      <div className="max-w-7xl mx-auto space-y-6">
        
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-slate-100 text-slate-900 rounded-lg">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Team Directory
              </h1>
            </div>
            <p className="text-xs text-slate-500 pl-9">
              Manage member profiles and roles
            </p>
          </div>

          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 text-white font-medium text-xs rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            Add Member
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by name or job title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all shadow-xs"
            />
          </div>
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center shadow-xs">
            <p className="text-sm font-medium text-slate-500">No team members match your criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try tweaking your search term</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredJobs.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold flex items-center justify-center text-sm shrink-0">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-slate-900">{item.name}</h3>
                      <span className="text-xs text-slate-400">{item.age} yrs</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{item.job}</p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>

                  <button
                    onClick={() => deleteUI(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-xs text-slate-400 text-right px-1 font-medium">
          Showing {filteredJobs.length} of {jobs.length} total members
        </div>
      </div>

      <MemberModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={selectedJob}
      />
    </div>
  );
}