import { create } from 'zustand';

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({ selectedConversation }),

  messages: [],
  setMessages: (update) => set((state) => ({
    messages: typeof update === 'function' ? update(state.messages) : update,
  })),

  loading: false,
  setLoading: (loading) => set({ loading }),

  showChatOnMobile: false,
  setShowChatOnMobile: (value) => set({ showChatOnMobile: value }),
}));

export default useConversation;
