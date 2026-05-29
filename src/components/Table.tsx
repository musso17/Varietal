import React from 'react';
import { Video, Camera, MessageSquare } from 'lucide-react';
import type { Post } from '../types';

interface TableProps {
  posts: Post[];
  onCardClick: (p: Post) => void;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

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

/**
 * Extracts a section from the concept text by its heading name.
 * Headings are uppercase lines like "OBJETIVO", "FORMATO", etc.
 */
const extractSection = (text: string, heading: string): string => {
  const regex = new RegExp(`${heading}\\s*\\n([\\s\\S]*?)(?=\\n[A-ZÁÉÍÓÚ ]{3,}\\n|$)`, 'i');
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

/**
 * Renders the concept field as a structured mini-brief preview.
 */
const ConceptPreview: React.FC<{ concept: string }> = ({ concept }) => {
  if (!concept) return <span style={{ color: '#AAAAAA' }}>—</span>;

  const objetivo = extractSection(concept, 'OBJETIVO');
  const formato = extractSection(concept, 'FORMATO');
  const estructura = extractSection(concept, 'ESTRUCTURA DE (?:PLANOS|SLIDES)');
  const copy = extractSection(concept, 'COPY DE PUBLICACIÓN \\(caption\\)');

  // If no structured sections found, just show a clipped plain text
  if (!objetivo && !formato) {
    return (
      <p style={{ fontSize: '12px', color: '#666', lineHeight: 1.5, margin: 0,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden' }}>
        {concept}
      </p>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>

      {/* Objetivo */}
      {objetivo && (
        <p style={{ fontSize: '12px', color: '#444', lineHeight: 1.5, margin: 0,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
          overflow: 'hidden' }}>
          {objetivo}
        </p>
      )}

      {/* Formato pill */}
      {formato && (
        <span style={{
          display: 'inline-block', fontSize: '10px', fontWeight: 700,
          textTransform: 'uppercase', letterSpacing: '0.06em',
          color: '#888888', background: '#F5F5F5',
          padding: '2px 8px', borderRadius: '2px', width: 'fit-content',
        }}>
          {formato.split('\n')[0]}
        </span>
      )}

      {/* Estructura — numbered list preview */}
      {estructura && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {estructura.split('\n')
            .filter(l => /^\d+\./.test(l.trim()))
            .slice(0, 4)
            .map((line, i) => {
              // Strip the copy part after "Copy:"
              const withoutCopy = line.replace(/\s*Copy:.*$/i, '').trim();
              return (
                <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{
                    flexShrink: 0, width: '16px', height: '16px',
                    background: '#000', color: '#fff',
                    borderRadius: '50%', fontSize: '9px', fontWeight: 800,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: '1px',
                  }}>
                    {i + 1}
                  </span>
                  <span style={{ fontSize: '11px', color: '#555', lineHeight: 1.4,
                    display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical',
                    overflow: 'hidden' }}>
                    {withoutCopy.replace(/^\d+\.\s*/, '')}
                  </span>
                </div>
              );
            })}
          {estructura.split('\n').filter(l => /^\d+\./.test(l.trim())).length > 4 && (
            <span style={{ fontSize: '10px', color: '#AAAAAA', paddingLeft: '22px' }}>
              +{estructura.split('\n').filter(l => /^\d+\./.test(l.trim())).length - 4} más...
            </span>
          )}
        </div>
      )}

      {/* Caption preview */}
      {copy && (
        <div style={{
          borderLeft: '2px solid var(--accent)',
          paddingLeft: '8px',
          marginTop: '2px',
        }}>
          <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#888', lineHeight: 1.4, margin: 0,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
            overflow: 'hidden' }}>
            {copy}
          </p>
        </div>
      )}
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

export const Table: React.FC<TableProps> = ({ posts, onCardClick }) => {
  const sortedPosts = [...posts].sort((a, b) => (a.date || '9999') > (b.date || '9999') ? 1 : -1);

  return (
    <div className="tbl-wrap">
      <div className="tbl-box">
        <table style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '80px' }} />
            <col style={{ width: '90px' }} />
            <col style={{ width: '340px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '110px' }} />
            <col style={{ width: '100px' }} />
            <col style={{ width: '60px' }} />
            <col style={{ width: '70px' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Pieza</th>
              <th>Pilar</th>
              <th>Objetivo</th>
              <th>Estado</th>
              <th style={{ textAlign: 'center' }}>💬</th>
              <th style={{ textAlign: 'center' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map(p => (
              <tr key={p.id} className="tbl-row" onClick={() => onCardClick(p)}>

                {/* Fecha */}
                <td style={{ whiteSpace: 'nowrap', color: '#6B6960', verticalAlign: 'top', paddingTop: '18px' }}>
                  {fmtDate(p.date)}
                </td>

                {/* Tipo */}
                <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  <span className={`type-badge ${p.type === 'video' ? 'type-video' : 'type-photo'}`}>
                    {p.type === 'video' ? <Video size={10} /> : <Camera size={10} />}
                    {p.type === 'video' ? 'Video' : 'Carrusel'}
                  </span>
                </td>

                {/* Pieza — título + brief preview */}
                <td style={{ verticalAlign: 'top', padding: '14px 20px' }}>
                  <div className="tbl-title" style={{ marginBottom: '10px' }}>{p.title}</div>
                  <ConceptPreview concept={p.concept} />
                </td>

                {/* Pilar */}
                <td style={{ fontSize: '11px', color: '#6B6960', verticalAlign: 'top', paddingTop: '18px' }}>
                  {p.pilar === 'La Tostaduría' ? 'Tostaduría' : p.pilar}
                </td>

                {/* Objetivo */}
                <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  {p.objective ? (
                    <span style={{
                      display: 'inline-block', fontSize: '10px', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      padding: '4px 8px', borderRadius: '2px',
                      background: p.objective === 'Posicionamiento' ? '#000' :
                                  p.objective === 'Educación' ? '#BA7517' : '#2D5A3D',
                      color: '#fff',
                    }}>
                      {p.objective}
                    </span>
                  ) : <span style={{ color: '#AAAAAA' }}>—</span>}
                </td>

                {/* Estado */}
                <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                  <span className={`status-pill pill-${p.status}`}>
                    {statusLabel[p.status]}
                  </span>
                </td>

                {/* Comentarios */}
                <td style={{ textAlign: 'center', verticalAlign: 'top', paddingTop: '18px' }}>
                  {p.comments.length > 0 ? (
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11px', fontWeight: 700 }}>
                      <MessageSquare size={11} />
                      {p.comments.length}
                    </span>
                  ) : (
                    <span style={{ color: '#DDDDDD' }}>—</span>
                  )}
                </td>

                {/* Link */}
                <td style={{ textAlign: 'center', verticalAlign: 'top', paddingTop: '18px' }}>
                  {p.link ? (
                    <a
                      href={p.link.startsWith('http') ? p.link : `https://${p.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="tbl-link"
                    >
                      Ver
                    </a>
                  ) : (
                    <span style={{ color: '#DDDDDD' }}>—</span>
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
