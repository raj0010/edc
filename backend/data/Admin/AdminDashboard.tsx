import React, { useState } from 'react';
import { Club, NewsItem } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Users, Megaphone, LogOut, Plus, Edit3, Save, Trash2, LayoutDashboard } from 'lucide-react';

interface AdminDashboardProps {
  clubs: Club[];
  news: NewsItem[];
  onUpdateClub: (clubId: string, data: Partial<Club>) => void;
  onAddNews: (news: NewsItem) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  clubs, 
  news, 
  onUpdateClub, 
  onAddNews,
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'clubs' | 'news'>('overview');
  const [editingClub, setEditingClub] = useState<string | null>(null);
  const [clubForm, setClubForm] = useState<Partial<Club>>({});
  
  // News Form State
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    summary: '',
    category: 'Announcement',
    author: 'Admin'
  });

  const handleEditClub = (club: Club) => {
    setEditingClub(club.id);
    setClubForm(club);
  };

  const handleSaveClub = () => {
    if (editingClub && clubForm) {
      onUpdateClub(editingClub, clubForm);
      setEditingClub(null);
    }
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNewsItem: NewsItem = {
      id: Date.now().toString(),
      title: newsForm.title || 'Untitled',
      summary: newsForm.summary || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      category: (newsForm.category as any) || 'Announcement',
      author: newsForm.author || 'Admin'
    };
    onAddNews(newNewsItem);
    setShowNewsForm(false);
    setNewsForm({ title: '', summary: '', category: 'Announcement', author: 'Admin' });
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-black text-neutral-900 dark:text-white flex flex-col md:flex-row font-sans">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-6 flex flex-col">
          <div className="flex items-center gap-3 mb-10 px-2">
             <div className="w-8 h-8 bg-neutral-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-black">
                 <Settings className="w-5 h-5 animate-spin-slow" />
             </div>
             <span className="font-bold font-display tracking-tight text-lg">ADMIN OS</span>
          </div>

          <nav className="flex-1 space-y-2">
             <SidebarItem 
                icon={LayoutDashboard} 
                label="Overview" 
                active={activeTab === 'overview'} 
                onClick={() => setActiveTab('overview')} 
             />
             <SidebarItem 
                icon={Users} 
                label="Manage Clubs" 
                active={activeTab === 'clubs'} 
                onClick={() => setActiveTab('clubs')} 
             />
             <SidebarItem 
                icon={Megaphone} 
                label="Announcements" 
                active={activeTab === 'news'} 
                onClick={() => setActiveTab('news')} 
             />
          </nav>

          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm font-bold"
          >
              <LogOut className="w-4 h-4" />
              Logout
          </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
         <div className="max-w-5xl mx-auto">
            
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-display uppercase tracking-tight">
                    {activeTab === 'overview' && 'System Overview'}
                    {activeTab === 'clubs' && 'Club Management'}
                    {activeTab === 'news' && 'News & Broadcasts'}
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
                    Welcome back, Admin. You have full control.
                </p>
            </div>

            {/* Content Switch */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        <StatCard label="Total Clubs" value={clubs.length} color="bg-blue-500" />
                        <StatCard label="Active Broadcasts" value={news.length} color="bg-emerald-500" />
                        <StatCard label="Pending Requests" value="12" color="bg-amber-500" />
                        
                        <div className="col-span-1 md:col-span-3 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 mt-6">
                            <h3 className="font-bold mb-4">Quick Actions</h3>
                            <div className="flex gap-4">
                                <button onClick={() => setActiveTab('news')} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                                    + New Announcement
                                </button>
                                <button onClick={() => setActiveTab('clubs')} className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-sm font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                                    Update Club Info
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'clubs' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {clubs.map(club => (
                            <div key={club.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6">
                                {editingClub === club.id ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Tagline</label>
                                            <input 
                                                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-sm"
                                                value={clubForm.tagline || ''} 
                                                onChange={e => setClubForm({...clubForm, tagline: e.target.value})}
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Description</label>
                                            <textarea 
                                                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 text-sm h-24"
                                                value={clubForm.description || ''} 
                                                onChange={e => setClubForm({...clubForm, description: e.target.value})}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={handleSaveClub} className="px-4 py-2 bg-green-500 text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                                <Save className="w-3 h-3" /> Save Changes
                                            </button>
                                            <button onClick={() => setEditingClub(null)} className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${club.color} flex items-center justify-center text-white font-bold`}>
                                                {club.name[0]}
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">{club.name}</h3>
                                                <p className="text-sm text-neutral-500">{club.tagline}</p>
                                            </div>
                                        </div>
                                        <button onClick={() => handleEditClub(club)} className="p-2 text-neutral-400 hover:text-blue-500 transition-colors">
                                            <Edit3 className="w-5 h-5" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </motion.div>
                )}

                {activeTab === 'news' && (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} 
                        animate={{ opacity: 1, y: 0 }}
                    >
                         <button 
                           onClick={() => setShowNewsForm(!showNewsForm)}
                           className="w-full py-4 border-2 border-dashed border-neutral-300 dark:border-neutral-800 rounded-2xl flex items-center justify-center gap-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors font-bold uppercase tracking-wider text-sm mb-6"
                         >
                            <Plus className="w-4 h-4" /> Create Broadcast
                         </button>

                         {showNewsForm && (
                             <form onSubmit={handleNewsSubmit} className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 mb-6 space-y-4">
                                 <div>
                                     <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Title</label>
                                     <input required value={newsForm.title} onChange={e => setNewsForm({...newsForm, title: e.target.value})} className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2" />
                                 </div>
                                 <div className="grid grid-cols-2 gap-4">
                                     <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Category</label>
                                        <select value={newsForm.category} onChange={e => setNewsForm({...newsForm, category: e.target.value as any})} className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2">
                                            <option value="Announcement">Announcement</option>
                                            <option value="Achievement">Achievement</option>
                                            <option value="Opportunity">Opportunity</option>
                                        </select>
                                     </div>
                                     <div>
                                        <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Author</label>
                                        <input value={newsForm.author} onChange={e => setNewsForm({...newsForm, author: e.target.value})} className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2" />
                                     </div>
                                 </div>
                                 <div>
                                     <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider block mb-1">Summary</label>
                                     <textarea required value={newsForm.summary} onChange={e => setNewsForm({...newsForm, summary: e.target.value})} className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-2 h-24" />
                                 </div>
                                 <button type="submit" className="w-full bg-neutral-900 dark:bg-white text-white dark:text-black py-3 rounded-lg font-bold uppercase tracking-widest text-xs">Publish</button>
                             </form>
                         )}

                         <div className="space-y-4">
                             {news.map(item => (
                                 <div key={item.id} className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex justify-between items-start">
                                     <div>
                                         <div className="flex items-center gap-2 mb-2">
                                             <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-800 rounded-md text-[10px] font-bold uppercase tracking-wider">{item.category}</span>
                                             <span className="text-xs text-neutral-400">{item.date}</span>
                                         </div>
                                         <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                                         <p className="text-sm text-neutral-500 dark:text-neutral-400">{item.summary}</p>
                                     </div>
                                     <button className="text-neutral-400 hover:text-red-500 transition-colors">
                                         <Trash2 className="w-4 h-4" />
                                     </button>
                                 </div>
                             ))}
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>

         </div>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button 
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-neutral-900 dark:bg-white text-white dark:text-black font-bold shadow-lg' : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`}
    >
        <Icon className="w-4 h-4" />
        <span className="text-sm">{label}</span>
    </button>
);

const StatCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
    <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 flex flex-col items-start relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 ${color}`}></div>
        <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2">{label}</span>
        <span className="text-4xl font-black font-display">{value}</span>
    </div>
);
