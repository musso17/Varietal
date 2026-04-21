import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { Board } from './components/Board';
import { Calendar } from './components/Calendar';
import { Table } from './components/Table';
import { CardDetailModal } from './components/CardDetailModal';
import { usePosts } from './hooks/usePosts';
import { useSessions } from './hooks/useSessions';
import type { Post } from './types';
import { Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const { posts, loading: postsLoading, savePost, deletePost, updateStatus } = usePosts();
  const { sessions, loading: sessionsLoading, toggleSession } = useSessions();
  const [view, setView] = useState<'board' | 'calendar' | 'table'>('board');

  const loading = postsLoading || sessionsLoading;
  const [search, setSearch] = useState('');
  const [filterPilar, setFilterPilar] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    return posts.filter(p => {
      const matchesSearch = (p.title || '').toLowerCase().includes(search.toLowerCase()) || 
                           (p.concept || '').toLowerCase().includes(search.toLowerCase());
      const matchesPilar = filterPilar ? p.pilar === filterPilar : true;
      const matchesType = filterType ? p.type === filterType : true;
      return matchesSearch && matchesPilar && matchesType;
    });
  }, [posts, search, filterPilar, filterType]);

  const handleOpenModal = (post: Post | null = null, initialDate: string = '') => {
    if (post) {
      setSelectedPost(post);
    } else {
      setSelectedPost({
        id: crypto.randomUUID(), // Use crypto.randomUUID() for new post IDs
        title: '',
        type: 'photo',
        pilar: 'La Tostaduría',
        concept: '',
        visual: '',
        status: 'idea',
        date: initialDate || '',
        link: '',
        comments: []
      });
    }
    setIsModalOpen(true);
  };

  const handleSave = async (post: Post) => {
    await savePost(post);
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Eliminar esta pieza de contenido?')) {
      await deletePost(id);
      setIsModalOpen(false);
      setSelectedPost(null);
    }
  };

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
        <Loader2 className="animate-spin" size={32} color="var(--text3)" />
        <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text3)', fontWeight: 500 }}>Sincronizando con Supabase...</p>
      </div>
    );
  }

  return (
    <>
      <Header 
        posts={posts}
        view={view}
        setView={setView}
        search={search}
        setSearch={setSearch}
        filterPilar={filterPilar}
        setFilterPilar={setFilterPilar}
        filterType={filterType}
        setFilterType={setFilterType}
        onNew={() => handleOpenModal()}
      />
      
      <main className="main">
        {view === 'board' && (
          <Board 
            posts={filteredPosts} 
            onCardClick={handleOpenModal} 
            onUpdateStatus={updateStatus} 
          />
        )}
        {view === 'calendar' && (
          <Calendar 
            posts={filteredPosts} 
            sessions={sessions}
            onToggleSession={toggleSession}
            onCardClick={handleOpenModal} 
            onNew={(date) => handleOpenModal(null, date)} 
            onUpdateDate={(id, date) => {
              const post = posts.find(p => p.id === id);
              if (post) savePost({ ...post, date });
            }}
          />
        )}
        {view === 'table' && (
          <Table 
            posts={filteredPosts} 
            onCardClick={handleOpenModal} 
          />
        )}
      </main>

      <CardDetailModal 
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleClose}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </>
  );
};

export default App;
