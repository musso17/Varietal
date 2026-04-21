import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import type { Post, Status } from '../types';

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to real-time changes
    const channel = supabase
      .channel('public:posts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => {
        fetchPosts();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const savePost = async (post: Post) => {
    // Optimistic Update
    setPosts(prev => {
      const exists = prev.find(p => p.id === post.id);
      if (exists) return prev.map(p => p.id === post.id ? post : p);
      return [...prev, post];
    });

    const { error } = await supabase
      .from('posts')
      .upsert({
        id: post.id,
        title: post.title,
        type: post.type,
        pilar: post.pilar,
        concept: post.concept,
        visual: post.visual,
        status: post.status,
        date: post.date || null,
        link: post.link,
        comments: post.comments
      });

    if (error) {
      console.error('Error saving post:', error);
      fetchPosts(); // Rollback
    }
  };

  const deletePost = async (id: string) => {
    // Optimistic Update
    setPosts(prev => prev.filter(p => p.id !== id));

    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting post:', error);
      fetchPosts(); // Rollback
    }
  };

  const updateStatus = async (id: string, status: Status) => {
    // Optimistic Update
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));

    const { error } = await supabase
      .from('posts')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      // Revert if error
      fetchPosts();
    }
  };

  return { posts, loading, savePost, deletePost, updateStatus };
};
