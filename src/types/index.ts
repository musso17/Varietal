export type Status = 'idea' | 'produccion' | 'revision' | 'aprobado';
export type PostType = 'video' | 'photo';
export type Pilar = 'La Tostaduría' | 'La Barra';
export type Objective = 'Posicionamiento' | 'Educación' | 'Comunidad';

export interface Comment {
  id: string;
  author: string;
  text: string;
}

export interface Post {
  id: string;
  title: string;
  type: PostType;
  pilar: Pilar; // Changed from block to pilar
  concept: string;
  visual: string;
  status: Status;
  date: string;
  link: string;
  objective?: Objective;
  comments: Comment[];
}

export interface Session {
  id: string;
  date: string;
}

export const COLS: { id: Status; label: string; dot: string }[] = [
  { id: 'idea', label: 'Ideas & Guion', dot: '#888780' },
  { id: 'produccion', label: 'En Producción (Cerezo)', dot: '#BA7517' },
  { id: 'revision', label: 'Revisión (Varietal)', dot: '#D85A30' },
  { id: 'aprobado', label: 'Aprobado & Programado', dot: '#639922' },
];
