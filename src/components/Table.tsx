import React from 'react';
import { Video, Camera, ExternalLink } from 'lucide-react';
import type { Post } from '../types';

interface TableProps {
  posts: Post[];
  onCardClick: (p: Post) => void;
}

export const Table: React.FC<TableProps> = ({ posts, onCardClick }) => {
  const sortedPosts = [...posts].sort((a, b) => (a.date || '9999') > (b.date || '9999') ? 1 : -1);

  const statusLabel: Record<string, string> = {
    idea: 'Idea',
    produccion: 'Producción',
    revision: 'Revisión',
    aprobado: 'Aprobado'
  };

  const fmtDate = (d: string) => {
    if (!d) return 'Sin fecha';
    return new Date(d + 'T00:00:00').toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="tbl-wrap">
      <div className="tbl-box">
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Pieza</th>
              <th>Pilar</th>
              <th>Estado</th>
              <th style={{ textAlign: 'center' }}>Feedback</th>
              <th style={{ textAlign: 'center' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map(p => (
              <tr key={p.id} className="tbl-row" onClick={() => onCardClick(p)}>
                <td style={{ whiteSpace: 'nowrap', color: '#6B6960' }}>{fmtDate(p.date)}</td>
                <td>
                  <span className={`type-badge ${p.type === 'video' ? 'type-video' : 'type-photo'}`}>
                    {p.type === 'video' ? <Video size={10} /> : <Camera size={10} />}
                    {p.type === 'video' ? 'Video' : 'Foto'}
                  </span>
                </td>
                <td>
                  <div className="tbl-title">{p.title}</div>
                  <div className="tbl-concept">{p.concept}</div>
                </td>
                <td style={{ fontSize: '11px', color: '#6B6960' }}>{p.pilar}</td>
                <td>
                  <span className={`status-pill pill-${p.status}`}>
                    {statusLabel[p.status]}
                  </span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  {p.comments.length > 0 ? (
                    <span style={{ fontSize: '11px', fontWeight: 600 }}>{p.comments.length}</span>
                  ) : (
                    <span style={{ color: '#A39E95' }}>—</span>
                  )}
                </td>
                <td style={{ textAlign: 'center' }}>
                  {p.link ? (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{ color: '#185FA5', display: 'flex', justifyContent: 'center' }}
                    >
                      <ExternalLink size={12} />
                    </a>
                  ) : (
                    <span style={{ color: '#A39E95' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
