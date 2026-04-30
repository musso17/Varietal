import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Video, Camera, Calendar, MessageSquare } from 'lucide-react';
import { COLS, type Post, type Status } from '../types';

interface BoardProps {
  posts: Post[];
  onCardClick: (p: Post) => void;
  onUpdateStatus: (id: string, s: Status) => void;
}

export const Board: React.FC<BoardProps> = ({ posts, onCardClick, onUpdateStatus }) => {
  const [draggedId, setDraggedId] = React.useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = React.useState<Status | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverCol(null);
  };

  const handleDrop = (s: Status) => {
    if (draggedId) {
      onUpdateStatus(draggedId, s);
    }
  };

  const fmtDate = (d: string) => {
    if (!d) return 'Sin fecha';
    return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="board">
      {COLS.map(col => {
        const colPosts = posts.filter(p => p.status === col.id);
        const isOver = dragOverCol === col.id;

        return (
          <div
            key={col.id}
            className={`col ${isOver ? 'drag-over' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
            onDragLeave={() => setDragOverCol(null)}
            onDrop={() => handleDrop(col.id)}
          >
            <div className="col-head">
              <div className="col-title">
                <span className="col-dot" style={{ background: col.dot }}></span>
                {col.label}
              </div>
              <span className="col-count">{colPosts.length}</span>
            </div>
            <div className="col-body">
              {colPosts.length === 0 && (
                <div className="col-empty">Arrastra piezas aquí</div>
              )}
              <AnimatePresence>
                {colPosts.map(p => (
                  <motion.div
                    key={p.id}
                    layoutId={p.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`card status-${p.status} ${draggedId === p.id ? 'dragging' : ''}`}
                    draggable
                    onDragStart={() => handleDragStart(p.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => onCardClick(p)}
                  >
                    <div className="card-top">
                      <div className="card-meta">
                        <span className={`type-badge type-${p.type} ${p.type === 'video' ? 'type-video' : 'type-photo'}`}>
                          {p.type === 'video' ? <Video size={10} /> : <Camera size={10} />}
                          {p.type === 'video' ? 'Video' : 'Foto'}
                        </span>
                        <span className="pilar-label">
                          {p.pilar === 'La Tostaduría' ? 'Tostaduría' : p.pilar}
                        </span>
                        {p.objective && (
                          <span className="pilar-label" style={{ background: 'rgba(186, 117, 23, 0.1)', color: '#BA7517', marginLeft: '4px' }}>
                            {p.objective}
                          </span>
                        )}
                      </div>
                      <div className="card-icons">
                        {p.comments.length > 0 && (
                          <span className="comment-badge">
                            <MessageSquare size={10} />
                            {p.comments.length}
                          </span>
                        )}
                        {p.link && <span className="link-dot" title="Tiene link"></span>}
                      </div>
                    </div>
                    <div className="card-title">{p.title}</div>
                    <div className="card-concept">{p.concept}</div>
                    <div className="card-foot">
                      <span className="card-date">
                        <Calendar size={10} /> {fmtDate(p.date)}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
};
