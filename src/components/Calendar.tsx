import React, { useState } from 'react';
import { Video, Camera, ChevronLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import type { Post, Session } from '../types';

interface CalendarProps {
  posts: Post[];
  sessions: Session[];
  onCardClick: (p: Post) => void;
  onUpdateDate: (id: string, date: string) => void;
  onNew: (date: string) => void;
  onToggleSession: (date: string) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  posts, 
  sessions, 
  onCardClick, 
  onUpdateDate, 
  onNew, 
  onToggleSession 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 1)); // Start at May 2026

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 = Sun

  const changeMonth = (offset: number) => {
    setCurrentDate(new Date(year, month + offset, 1));
  };

  const fmtDate = (d: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(d).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const onDragStart = (e: React.DragEvent, postId: string) => {
    e.dataTransfer.setData('postId', postId);
  };

  const onDrop = (e: React.DragEvent, date: string) => {
    e.preventDefault();
    const postId = e.dataTransfer.getData('postId');
    if (postId) onUpdateDate(postId, date);
  };

  const cells = [];
  // Blanks
  for (let i = 0; i < firstDayOfMonth; i++) {
    cells.push(<div key={`blank-start-${i}`} className="cal-cell blank" />);
  }

  // Days
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = fmtDate(d);
    const dayPosts = posts.filter(p => p.date === dateStr);
    const isSession = sessions.some(s => s.date === dateStr);

    cells.push(
      <div 
        key={d} 
        className={`cal-cell ${isSession ? 'is-session' : ''}`} 
        onClick={() => onNew(dateStr)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => onDrop(e, dateStr)}
      >
        <div className="cal-num">{d}</div>
        
        <div className="session-indicator">
          <button 
            className={`session-btn ${isSession ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleSession(dateStr);
            }}
            title="Toggle Session Day"
          >
            <CalendarCheck size={14} />
          </button>
        </div>

        {dayPosts.map(p => (
          <div
            key={p.id}
            draggable
            onDragStart={(e) => onDragStart(e, p.id)}
            className={`cal-chip type-${p.type}`}
            onClick={(e) => {
              e.stopPropagation();
              onCardClick(p);
            }}
          >
            <span className={`status-dot dot-${p.status}`} />
            {p.type === 'video' ? <Video size={9} /> : <Camera size={9} />}
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {p.title.split(':')[1]?.trim() || p.title}
            </span>
          </div>
        ))}
      </div>
    );
  }

  // Final blanks
  const remainingCells = (7 - (cells.length % 7)) % 7;
  for (let i = 0; i < remainingCells; i++) {
    cells.push(<div key={`blank-end-${i}`} className="cal-cell blank" />);
  }

  return (
    <div className="cal-wrap">
      <div className="cal-box">
        <div className="cal-head">
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <span className="cal-title">{monthNames[month]} {year}</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button 
                onClick={() => changeMonth(-1)}
                style={{ background: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', display: 'flex' }}
              >
                <ChevronLeft size={16} />
              </button>
              <button 
                onClick={() => changeMonth(1)}
                style={{ background: '#F5F5F5', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', display: 'flex' }}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
          <div className="cal-legend">
            <div className="leg-item"><span className="leg-dot" style={{ background: 'var(--accent)', height: '2px', width: '12px' }}></span>Sesión</div>
            <div className="leg-item"><span className="leg-dot" style={{ background: 'var(--idea-dot)' }}></span>Idea</div>
            <div className="leg-item"><span className="leg-dot" style={{ background: 'var(--prod-dot)' }}></span>Producción</div>
            <div className="leg-item"><span className="leg-dot" style={{ background: 'var(--rev-dot)' }}></span>Revisión</div>
            <div className="leg-item"><span className="leg-dot" style={{ background: 'var(--app-dot)' }}></span>Aprobado</div>
          </div>
        </div>
        <div className="cal-days">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => (
            <div key={d} className="cal-day-label">{d}</div>
          ))}
        </div>
        <div className="cal-grid">{cells}</div>
      </div>
    </div>
  );
};
