import React, { useState, useEffect } from 'react';
import { X, Check, Trash2, Send, MessageSquare } from 'lucide-react';
import { COLS, type Post } from '../types';

interface CardDetailModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (p: Post) => void;
  onDelete: (id: string) => void;
}

export const CardDetailModal: React.FC<CardDetailModalProps> = ({ post, isOpen, onClose, onSave, onDelete }) => {
  const [formData, setFormData] = useState<Post | null>(null);
  const [commentText, setCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState('');

  useEffect(() => {
    if (post) {
      const commentsWithIds = post.comments.map(c => ({
        ...c,
        id: c.id || crypto.randomUUID()
      }));
      setFormData({ ...post, comments: commentsWithIds });
    } else {
      setFormData(null);
    }
    setEditingCommentId(null);
  }, [post]);

  if (!formData) return null;

  const handleSave = () => {
    if (formData) onSave(formData);
  };

  const handleAddComment = () => {
    if (!commentText.trim() || !formData) return;
    const newComment = { 
      id: crypto.randomUUID(), 
      author: 'Varietal (Cliente)', 
      text: commentText.trim() 
    };
    setFormData({ ...formData, comments: [...formData.comments, newComment] });
    setCommentText('');
  };

  const handleDeleteComment = (id: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      comments: formData.comments.filter(c => c.id !== id)
    });
  };

  const startEditing = (id: string, text: string) => {
    setEditingCommentId(id);
    setEditCommentText(text);
  };

  const handleUpdateComment = () => {
    if (!formData || !editingCommentId) return;
    setFormData({
      ...formData,
      comments: formData.comments.map(c => 
        c.id === editingCommentId ? { ...c, text: editCommentText } : c
      )
    });
    setEditingCommentId(null);
  };

  return (
    <div className={`overlay ${isOpen ? 'open' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">{formData.title || 'Nueva pieza'}</span>
          <button className="panel-close" onClick={onClose}>
            <X size={16} />
          </button>
        </div>
        <div className="panel-body">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej. Reel de extracción"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Formato</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="photo">Fotografía</option>
                <option value="video">Video / Reel</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fecha programada</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Pilar estratégico</label>
            <select
              value={formData.pilar}
              onChange={(e) => setFormData({ ...formData, pilar: e.target.value as any })}
            >
              <option value="La Tostaduría">La Tostaduría</option>
              <option value="La Barra">La Barra</option>
            </select>
          </div>
          <div className="form-group">
            <label>Concepto / Contenido</label>
            <textarea
              rows={3}
              value={formData.concept}
              onChange={(e) => setFormData({ ...formData, concept: e.target.value })}
              placeholder="¿De qué trata este post?"
            />
          </div>
          <div className="form-group">
            <label>Dirección visual</label>
            <textarea
              rows={2}
              style={{ fontStyle: 'italic', color: 'var(--text2)' }}
              value={formData.visual}
              onChange={(e) => setFormData({ ...formData, visual: e.target.value })}
              placeholder="Ej: planos detalle, flat-lay editorial..."
            />
          </div>
          <div className="form-group">
            <label>Link de assets / referencia</label>
            <input
              type="url"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              placeholder="https://drive.google.com/..."
            />
          </div>
          <div className="form-group">
            <label>Estado</label>
            <div className="status-grid">
              {COLS.map(c => (
                <button
                  key={c.id}
                  className={`status-btn ${formData.status === c.id ? `selected ${c.id}` : ''}`}
                  onClick={() => setFormData({ ...formData, status: c.id })}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="divider"></div>
          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <MessageSquare size={11} />
              Comentarios y feedback
            </label>
            <div className="comments-wrap">
              {formData.comments.length === 0 ? (
                <div className="comment-empty">Sin comentarios aún.</div>
              ) : (
                formData.comments.map((c, i) => (
                  <div key={c.id || i} className="comment-item">
                    <div className="comment-author">{c.author}</div>
                    <div className={`comment-text ${c.author === 'Cerezo' ? 'comment-cerezo' : 'comment-varietal'}`}>
                      {editingCommentId === c.id ? (
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input 
                            autoFocus
                            className="comment-edit-input"
                            value={editCommentText}
                            onChange={(e) => setEditCommentText(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleUpdateComment()}
                          />
                          <button onClick={handleUpdateComment} className="comment-action-btn" style={{ color: 'var(--accent)' }}>
                             <Check size={12} />
                          </button>
                        </div>
                      ) : (
                        <>
                          {c.text}
                          <div className="comment-actions">
                            <button className="comment-action-btn" onClick={() => startEditing(c.id, c.text)}>
                              <Send size={10} style={{ transform: 'rotate(-90deg)' }} /> 
                            </button>
                            <button className="comment-action-btn btn-del-com" onClick={() => handleDeleteComment(c.id)}>
                              <Trash2 size={10} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="comment-row">
              <input
                className="comment-input"
                type="text"
                placeholder="Escribir feedback..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button className="btn-send" onClick={handleAddComment}>
                <Send size={12} />
              </button>
            </div>
          </div>
        </div>
        <div className="panel-foot">
          <button className="btn-del" onClick={() => onDelete(formData.id)}>
            <Trash2 size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'text-bottom' }} /> Eliminar pieza
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="btn-cancel" onClick={onClose}>Cancelar</button>
            <button className="btn-save" onClick={handleSave}>
              <Check size={14} /> Guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
