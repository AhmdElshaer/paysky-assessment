import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { User } from '@/types';
import toast from 'react-hot-toast';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,
      login: async (username, password) => {
        set({ isLoading: true });
        try {
          const response = await fetch('https://fakestoreapi.com/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username, password : password }),
          });

          if (!response.ok) throw new Error('Invalid credentials');

          const { token } = await response.json();
          
          const userResponse = await fetch('https://fakestoreapi.com/users/1');
          const userData = await userResponse.json();
          
          const user: User = {
            id: userData.id,
            email: userData.email,
            username: userData.username,
            firstName: userData.name.firstname,
            lastName: userData.name.lastname,
            avatar: `https://ui-avatars.com/api/?name=${userData.name.firstname}+${userData.name.lastname}&background=random`,
            token,
          };

          set({ user });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        } finally{
          set({ isLoading: false });
        }
      },
      logout: () => {
        set({ user: null });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      storage: createJSONStorage(() => localStorage),
    }
  )
);