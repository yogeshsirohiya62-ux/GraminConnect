import { create } from 'zustand';

const useStore = create((set, get) => ({
  user: JSON.parse(localStorage.getItem('gramin_user') || 'null'),
  token: localStorage.getItem('gramin_token') || null,
  language: 'en', // 'en' | 'hi'
  isOffline: !navigator.onLine,

  setLanguage: (lang) => set({ language: lang }),
  setOfflineStatus: (status) => set({ isOffline: status }),

  login: async (username, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem('gramin_user', JSON.stringify(data.user));
        localStorage.setItem('gramin_token', data.token);
        set({ user: data.user, token: data.token });
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Login failed' };
      }
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  register: async (userData) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem('gramin_user', JSON.stringify(data.user));
        localStorage.setItem('gramin_token', data.token);
        set({ user: data.user, token: data.token });
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.message || 'Registration failed' };
      }
    } catch (err) {
      return { success: false, message: 'Server unreachable' };
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('gramin_user');
    localStorage.removeItem('gramin_token');
    set({ user: null, token: null });
  }
}));

export default useStore;
