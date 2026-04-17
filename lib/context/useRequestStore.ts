import { create } from "zustand";
import { EmployerRoles } from "@/types/catalog";

interface RequestState {
  step: number;
  nextStep: () => void;
  prevStep: () => void;

  role: EmployerRoles | null;
  role_level: string | null;
  challenge: { id: string; title: string } | null;
  shortlist_size: number;
  deadline: string;

  setRole: (role: EmployerRoles) => void;
  setRoleLevel: (level: string) => void;
  setChallenge: (challenge: { id: string; title: string }) => void;
  setShortlistSize: (size: number) => void;
  setDeadline: (date: string) => void;

  reset: () => void;
}

export const useRequestStore = create<RequestState>((set) => ({
  step: 1,

  role: null,
  role_level: null,
  challenge: null,
  shortlist_size: 5,
  deadline: "",

  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

  setRole: (role) => set({ role }),
  setRoleLevel: (role_level) => set({ role_level }),
  setChallenge: (challenge) => set({ challenge }),
  setShortlistSize: (shortlist_size) => set({ shortlist_size }),
  setDeadline: (deadline) => set({ deadline }),

  reset: () =>
    set({
      step: 1,
      role: null,
      role_level: null,
      challenge: null,
      shortlist_size: 5,
      deadline: "",
    }),
}));
