import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { Session } from '../types';

export const useSessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('date', { ascending: true });

    if (error) {
      console.error('Error fetching sessions:', error);
    } else {
      setSessions(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();

    const channel = supabase
      .channel('public:sessions')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions' }, () => {
        fetchSessions();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const toggleSession = async (date: string) => {
    const existing = sessions.find(s => s.date === date);

    if (existing) {
      // Optimistic delete
      setSessions(prev => prev.filter(s => s.id !== existing.id));
      const { error } = await supabase
        .from('sessions')
        .delete()
        .eq('id', existing.id);
      if (error) {
        console.error('Error deleting session:', error);
        fetchSessions();
      }
    } else {
      // Limit to 2 sessions per month
      const [y, m] = date.split('-');
      const monthSessions = sessions.filter(s => s.date.startsWith(`${y}-${m}`));
      
      if (monthSessions.length >= 2) {
        alert('Solo se permiten 2 sesiones por mes.');
        return;
      }

      const newSession = { date };
      // Optimistic insert (without ID for a moment or just wait)
      const { data, error } = await supabase
        .from('sessions')
        .insert(newSession)
        .select()
        .single();

      if (error) {
        console.error('Error creating session:', error);
      } else if (data) {
        setSessions(prev => [...prev, data]);
      }
    }
  };

  return { sessions, loading, toggleSession };
};
