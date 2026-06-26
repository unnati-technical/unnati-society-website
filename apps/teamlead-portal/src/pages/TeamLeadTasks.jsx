import React, { useEffect, useState } from 'react';
import TeamLeadLayout from '../components/teamlead/TeamLeadLayout';
import { CheckSquare, Clock, AlertCircle, Calendar } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const tasksData = [
  { id: 1, title: 'Review Volunteer Applications', type: 'Administrative', deadline: 'Today, 5:00 PM', priority: 'High', completed: false },
  { id: 2, title: 'Finalize Module 2 Content', type: 'Curriculum', deadline: 'Tomorrow, 10:00 AM', priority: 'Medium', completed: false },
  { id: 3, title: 'Send Weekly Update to Core Team', type: 'Communication', deadline: 'May 14, 2:00 PM', priority: 'Medium', completed: false },
  { id: 4, title: 'Verify Attendance Logs', type: 'Administrative', deadline: 'May 15, 6:00 PM', priority: 'Low', completed: true },
  { id: 5, title: 'Schedule Feedback Call with SFS School', type: 'Partner Relations', deadline: 'May 16, 11:00 AM', priority: 'High', completed: false },
];

const TeamLeadTasks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [tasks, setTasks] = useState(tasksData);

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <TeamLeadLayout>
      <div className="max-w-[1000px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Tasks & Assignments</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Manage your to-do list and upcoming deadlines</p>
          </div>
          <button className="bg-brand-primary text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-md shadow-brand-primary/20 hover:brightness-110 transition-all">
            Add New Task
          </button>
        </div>

        {/* Task List */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {tasks.map((task, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={task.id}
              className="group flex items-center gap-4 p-5 lg:p-6 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => toggleTask(task.id)}
            >
              {/* Checkbox */}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${task.completed ? 'bg-brand-primary border-brand-primary' : 'border-gray-300 group-hover:border-brand-primary'}`}>
                {task.completed && <CheckSquare size={14} className="text-white" />}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-base truncate transition-all ${task.completed ? 'text-gray-400 line-through' : 'text-[#0F172A]'}`}>
                  {task.title}
                </h4>
                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-wider">{task.type}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className={`text-xs font-bold flex items-center gap-1 ${task.deadline.includes('Today') && !task.completed ? 'text-red-500' : 'text-gray-400'}`}>
                    <Clock size={12} /> {task.deadline}
                  </span>
                </div>
              </div>

              {/* Priority Tag */}
              <div className="shrink-0 hidden sm:block">
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider flex items-center gap-1 ${
                  task.priority === 'High' ? 'bg-red-50 text-red-600' :
                  task.priority === 'Medium' ? 'bg-orange-50 text-orange-600' :
                  'bg-green-50 text-green-600'
                }`}>
                  {task.priority === 'High' && <AlertCircle size={10} strokeWidth={3} />}
                  {task.priority}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TeamLeadLayout>
  );
};

export default TeamLeadTasks;
