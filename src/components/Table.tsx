import React, { useState } from 'react';
import { 
  Video, 
  Camera, 
  MessageSquare, 
  Target, 
  List, 
  Quote, 
  Sparkles, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react';
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
 * Robust regex helper that extracts sections from structured markdown briefs.
 */
const extractSection = (text: string, headingPattern: string): string => {
  if (!text) return '';
  const regex = new RegExp(
    `(?:^|\\n)${headingPattern}\\s*\\n([\\s\\S]*?)(?=\\n(?:OBJETIVO|FORMATO|ESTRUCTURA|TEXTO EN PANTALLA|COPY DE PUBLICACIÓN|LO QUE NO HACER|MONTAJE|COLOR|AUDIO|FOTOGRAFÍA|TIPOGRAFÍA|NOTA CLAVE|CONTEXTO|BRIEF|PLANO GENERAL|PLANOS INDIVIDUALES|\\b[A-ZÁÉÍÓÚ ]{4,}\\b\\s*\\n)|$)`,
    'i'
  );
  const match = text.match(regex);
  return match ? match[1].trim() : '';
};

/**
 * Copy to clipboard button with a temporary copied state.
 */
const CopyButton: React.FC<{ text: string }> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent modal opening or cell toggle
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '10px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        background: copied ? '#E2FBEB' : '#F5F5F5',
        color: copied ? '#0E622F' : '#666666',
        border: '1px solid',
        borderColor: copied ? '#B7E8C9' : '#E8E8E8',
        padding: '3px 8px',
        borderRadius: '3px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
      title="Copiar texto para usar"
    >
      {copied ? '¡Copiado!' : 'Copiar Copy'}
    </button>
  );
};

/**
 * Renders the concept field as a structured mini-brief preview.
 * Supports a collapsed state and a gorgeous expanded interactive state.
 */
const ConceptPreview: React.FC<{ 
  post: Post; 
  isExpanded: boolean; 
  onToggleExpand: (e: React.MouseEvent) => void 
}> = ({ post, isExpanded, onToggleExpand }) => {
  const concept = post.concept || '';
  const visual = post.visual || '';

  const objetivo = extractSection(concept, 'OBJETIVO');
  const formato = extractSection(concept, 'FORMATO');
  const estructura = extractSection(concept, 'ESTRUCTURA DE (?:PLANOS|SLIDES|FIJA|DETALLES)?');
  const textoPantalla = extractSection(concept, 'TEXTO EN PANTALLA');
  const copy = extractSection(concept, 'COPY DE PUBLICACIÓN \\(caption\\)');
  const noHacer = extractSection(concept, 'LO QUE NO HACER') || extractSection(visual, 'LO QUE NO HACER');
  
  const montaje = extractSection(visual, 'MONTAJE');
  const color = extractSection(visual, 'COLOR');
  const audio = extractSection(visual, 'AUDIO');
  const fotoBrief = extractSection(visual, 'FOTOGRAFÍA') || extractSection(visual, 'BRIEF DE FOTOGRAFÍA — CEREZO') || extractSection(visual, 'PLANO GENERAL') || extractSection(visual, 'PLANOS INDIVIDUALES');
  const typoBrief = extractSection(visual, 'TIPOGRAFÍA EN SLIDES');

  // If no structured sections are found at all, fall back to simple plain text clipping
  if (!objetivo && !formato && !estructura && !copy) {
    return (
      <p style={{ 
        fontSize: '12px', color: '#666', lineHeight: 1.5, margin: 0,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical',
        overflow: 'hidden' 
      }}>
        {concept}
      </p>
    );
  }

  // COLLAPSED VIEW
  if (!isExpanded) {
    return (
      <div 
        style={{ display: 'flex', flexDirection: 'column', gap: '8px', cursor: 'default' }} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Simple inline summary of objective */}
        {objetivo && (
          <div style={{ fontSize: '12px', color: '#555', lineHeight: 1.4, display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
            <Target size={13} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {objetivo}
            </span>
          </div>
        )}
        
        {/* Row of badges/previews */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap', marginTop: '2px' }}>
          {formato && (
            <span style={{
              fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
              background: '#F0F0F0', color: '#666', padding: '2px 6px', borderRadius: '2px'
            }}>
              {formato.split('\n')[0]}
            </span>
          )}
          {estructura && (
            <span style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <List size={12} />
              {estructura.split('\n').filter(l => /^\d+\./.test(l.trim())).length || 'Varios'} pasos
            </span>
          )}
          {copy && (
            <span style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px', fontStyle: 'italic' }}>
              <Quote size={10} />
              "{copy.slice(0, 30)}..."
            </span>
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={onToggleExpand}
          style={{
            alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px',
            background: 'none', border: 'none', color: 'var(--accent)', fontSize: '11px',
            fontWeight: 700, cursor: 'pointer', padding: '4px 0', marginTop: '2px',
            transition: 'color 0.2s'
          }}
          className="expand-btn"
        >
          <ChevronDown size={14} />
          Ver brief completo
        </button>
      </div>
    );
  }

  // EXPANDED GLORIOUS VIEW
  return (
    <div 
      style={{ 
        display: 'flex', flexDirection: 'column', gap: '14px', 
        marginTop: '12px', cursor: 'default', borderTop: '1px dashed rgba(0,0,0,0.08)', 
        paddingTop: '14px' 
      }} 
      onClick={(e) => e.stopPropagation()}
    >
      {/* Objetivo */}
      {objetivo && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Target size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#999' }}>Objetivo</span>
          </div>
          <p style={{ fontSize: '12px', color: '#222', lineHeight: 1.5, margin: 0 }}>
            {objetivo}
          </p>
        </div>
      )}

      {/* Estructura (Planos/Slides) */}
      {estructura && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <List size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#999' }}>
              {post.type === 'video' ? 'Estructura de Planos' : 'Estructura del Carrusel'}
            </span>
          </div>
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: '5px', 
            background: '#FAF9F6', padding: '10px 12px', borderRadius: '4px', 
            border: '1px solid #EFECE6' 
          }}>
            {estructura.split('\n').map((line, i) => {
              if (!line.trim()) return null;
              const isNumbered = /^\d+\./.test(line.trim());
              return (
                <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11.5px', lineHeight: 1.45, color: '#333' }}>
                  {isNumbered ? (
                    <span style={{
                      flexShrink: 0, width: '16px', height: '16px', background: '#000', color: '#fff',
                      borderRadius: '50%', fontSize: '9px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1px'
                    }}>
                      {line.trim().match(/^\d+/)?.[0]}
                    </span>
                  ) : <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>•</span>}
                  <span style={{ flex: 1 }}>
                    {line.replace(/^\d+\.\s*/, '').trim()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Texto en pantalla */}
      {textoPantalla && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#999' }}>Texto en pantalla</span>
          <div style={{ fontSize: '11px', color: '#555', background: '#FFFDF6', borderLeft: '3px solid #E09E06', padding: '6px 10px', fontStyle: 'italic', borderRadius: '0 4px 4px 0' }}>
            {textoPantalla}
          </div>
        </div>
      )}

      {/* Copy / Caption */}
      {copy && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Quote size={13} style={{ color: 'var(--accent)' }} />
              <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#999' }}>Copy de Publicación (caption)</span>
            </div>
            <CopyButton text={copy} />
          </div>
          <div style={{
            background: '#FFF0F5', borderLeft: '3px solid var(--accent)', padding: '10px 12px', borderRadius: '0 4px 4px 0',
            fontSize: '11.5px', color: '#444', lineHeight: 1.5, whiteSpace: 'pre-wrap', fontStyle: 'italic'
          }}>
            {copy}
          </div>
        </div>
      )}

      {/* Dirección Visual (Grid) */}
      {(montaje || color || audio || fotoBrief || typoBrief) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={13} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#999' }}>Dirección Estética & Producción</span>
          </div>
          <div style={{ 
            display: 'flex', flexDirection: 'column', gap: '8px', 
            background: '#FDFDFD', padding: '10px 12px', borderRadius: '4px', 
            border: '1px solid #ECECEC' 
          }}>
            {montaje && (
              <div style={{ fontSize: '11.5px', lineHeight: 1.4 }}>
                <strong style={{ color: '#222', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '1px' }}>🎬 Montaje / Ritmo</strong>
                <span style={{ color: '#555' }}>{montaje}</span>
              </div>
            )}
            {color && (
              <div style={{ fontSize: '11.5px', lineHeight: 1.4 }}>
                <strong style={{ color: '#222', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '1px' }}>🎨 Paleta de Color</strong>
                <span style={{ color: '#555' }}>{color}</span>
              </div>
            )}
            {audio && (
              <div style={{ fontSize: '11.5px', lineHeight: 1.4 }}>
                <strong style={{ color: '#222', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '1px' }}>🎵 Audio & Sonido</strong>
                <span style={{ color: '#555' }}>{audio}</span>
              </div>
            )}
            {fotoBrief && (
              <div style={{ fontSize: '11.5px', lineHeight: 1.4 }}>
                <strong style={{ color: '#222', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '1px' }}>📸 Brief de Fotografía (Cerezo)</strong>
                <span style={{ color: '#555', whiteSpace: 'pre-wrap' }}>{fotoBrief}</span>
              </div>
            )}
            {typoBrief && (
              <div style={{ fontSize: '11.5px', lineHeight: 1.4 }}>
                <strong style={{ color: '#222', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '1px' }}>✍️ Tipografía</strong>
                <span style={{ color: '#555' }}>{typoBrief}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lo que no hacer */}
      {noHacer && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={13} style={{ color: '#C0392B' }} />
            <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#C0392B' }}>Lo que no hacer (Reglas)</span>
          </div>
          <div style={{
            background: '#FDF2F2', borderLeft: '3px solid #C0392B', padding: '8px 10px', borderRadius: '0 4px 4px 0',
            fontSize: '11px', color: '#7B241C', lineHeight: 1.45, display: 'flex', flexDirection: 'column', gap: '3px'
          }}>
            {noHacer.split('\n').map((line, i) => {
              if (!line.trim()) return null;
              return (
                <span key={i} style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                  <span style={{ color: '#C0392B', fontWeight: 'bold' }}>✗</span>
                  <span style={{ flex: 1 }}>{line.replace(/^[✗-]\s*/, '').trim()}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Collapse Button */}
      <button
        onClick={onToggleExpand}
        style={{
          alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '4px',
          background: 'none', border: 'none', color: '#888888', fontSize: '11px',
          fontWeight: 700, cursor: 'pointer', padding: '4px 0', marginTop: '2px',
          transition: 'color 0.2s'
        }}
        className="expand-btn"
      >
        <ChevronUp size={14} />
        Ocultar brief
      </button>
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────

export const Table: React.FC<TableProps> = ({ posts, onCardClick }) => {
  const [expandedPostIds, setExpandedPostIds] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // prevent row click / opening full modal
    setExpandedPostIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const sortedPosts = [...posts].sort((a, b) => (a.date || '9999') > (b.date || '9999') ? 1 : -1);

  return (
    <div className="tbl-wrap">
      <div className="tbl-box">
        <table style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '90px' }} />  {/* Fecha */}
            <col style={{ width: '100px' }} /> {/* Tipo */}
            <col style={{ width: '480px' }} /> {/* Pieza + Brief (Wider to hold glorious expanded brief) */}
            <col style={{ width: '110px' }} /> {/* Pilar */}
            <col style={{ width: '130px' }} /> {/* Objetivo */}
            <col style={{ width: '110px' }} /> {/* Estado */}
            <col style={{ width: '50px' }} />  {/* 💬 */}
            <col style={{ width: '70px' }} />  {/* Link */}
          </colgroup>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Tipo</th>
              <th>Pieza / Brief</th>
              <th>Pilar</th>
              <th>Objetivo</th>
              <th>Estado</th>
              <th style={{ textAlign: 'center' }}>💬</th>
              <th style={{ textAlign: 'center' }}>Link</th>
            </tr>
          </thead>
          <tbody>
            {sortedPosts.map(p => {
              const isExpanded = expandedPostIds.has(p.id);
              return (
                <tr 
                  key={p.id} 
                  className="tbl-row" 
                  onClick={() => onCardClick(p)}
                  style={{
                    background: isExpanded ? '#FCFCFC' : 'transparent',
                    borderLeft: isExpanded ? '3px solid var(--accent)' : 'none',
                    transition: 'background 0.2s, border-left 0.1s'
                  }}
                >

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
                    <div 
                      className="tbl-title" 
                      style={{ 
                        marginBottom: '8px',
                        fontSize: isExpanded ? '16px' : '15px',
                        fontWeight: 700,
                        color: '#000000',
                        fontFamily: "'DM Serif Display', serif"
                      }}
                    >
                      {p.title}
                    </div>
                    <ConceptPreview 
                      post={p} 
                      isExpanded={isExpanded} 
                      onToggleExpand={(e) => toggleExpand(p.id, e)} 
                    />
                  </td>

                  {/* Pilar */}
                  <td style={{ fontSize: '11px', color: '#6B6960', verticalAlign: 'top', paddingTop: '18px' }}>
                    {p.pilar === 'La Tostaduría' ? 'Tostaduría' : p.pilar}
                  </td>

                  {/* Objetivo */}
                  <td style={{ verticalAlign: 'top', paddingTop: '16px' }}>
                    {p.objective ? (
                      <span style={{
                        display: 'inline-block', fontSize: '9px', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.05em',
                        padding: '4px 8px', borderRadius: '2px',
                        background: p.objective === 'Posicionamiento' ? '#000000' :
                                    p.objective === 'Educación' ? '#BA7517' : '#2D5A3D',
                        color: '#ffffff',
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
