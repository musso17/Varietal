import React from 'react';
import { Search, Plus, Layout, Calendar, Table as TableIcon } from 'lucide-react';
import type { Post, Status } from '../types';

interface HeaderProps {
  posts: Post[];
  view: 'board' | 'calendar' | 'table';
  setView: (v: 'board' | 'calendar' | 'table') => void;
  search: string;
  setSearch: (s: string) => void;
  filterPilar: string;
  setFilterPilar: (s: string) => void;
  filterType: string;
  setFilterType: (s: string) => void;
  onNew: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  posts, view, setView, search, setSearch, filterPilar, setFilterPilar, filterType, setFilterType, onNew
}) => {
  const getCount = (s: Status) => posts.filter(p => p.status === s).length;
  const approvedCount = getCount('aprobado');
  const totalCount = posts.length;
  const progress = totalCount ? (approvedCount / totalCount) * 100 : 0;

  return (
    <header className="header">
      <div className="header-top">
        <div className="brand">
          <div className="brand-logo">V</div>
          <div>
            <div className="brand-name">Varietal × Cerezo</div>
            <div className="brand-sub">Estrategia de Contenidos</div>
          </div>
        </div>
        <div className="stats-row">
          <div className="stat">
            <span className="stat-dot" style={{ background: 'var(--idea-dot)' }}></span>
            <span className="stat-num">{getCount('idea')}</span> ideas
          </div>
          <div className="stat">
            <span className="stat-dot" style={{ background: 'var(--prod-dot)' }}></span>
            <span className="stat-num">{getCount('produccion')}</span> producción
          </div>
          <div className="stat">
            <span className="stat-dot" style={{ background: 'var(--rev-dot)' }}></span>
            <span className="stat-num">{getCount('revision')}</span> revisión
          </div>
          <div className="stat">
            <span className="stat-dot" style={{ background: 'var(--app-dot)' }}></span>
            <span className="stat-num">{getCount('aprobado')}</span> aprobados
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="toolbar">
          <div className="search-wrap">
            <Search className="search-icon" />
            <input
              className="search-input"
              type="text"
              placeholder="Buscar piezas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select value={filterPilar} onChange={(e) => setFilterPilar(e.target.value)}>
            <option value="">Todos los pilares</option>
            <option value="La Tostaduría">La Tostaduría</option>
            <option value="La Barra">La Barra</option>
          </select>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">Todos los tipos</option>
            <option value="video">Video / Reel</option>
            <option value="photo">Fotografía</option>
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div className="view-tabs">
            <button
              className={`tab ${view === 'board' ? 'active' : ''}`}
              onClick={() => setView('board')}
            >
              <Layout size={13} /> Board
            </button>
            <button
              className={`tab ${view === 'calendar' ? 'active' : ''}`}
              onClick={() => setView('calendar')}
            >
              <Calendar size={13} /> Calendario
            </button>
            <button
              className={`tab ${view === 'table' ? 'active' : ''}`}
              onClick={() => setView('table')}
            >
              <TableIcon size={13} /> Tabla
            </button>
          </div>
          <button className="btn-new" onClick={onNew}>
            <Plus size={13} strokeWidth={3} /> Nueva pieza
          </button>
        </div>
      </div>
    </header>
  );
};
