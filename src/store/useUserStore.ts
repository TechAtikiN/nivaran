import { create } from "zustand";

interface UserStore {
    role: Role;
    setRole: (role: Role) => void;
    userAddress: string;
    setUserAddress: (userAddress: string) => void;
}

interface HandleComplaintStore {
    complaint: Complaint | null;
    setComplaint: (complaint: Complaint) => void;
}

export enum Role {
    ADMIN = "Admin",
    POLICE = "Police",
    NULL = 0 as const,
}

export const userUserStore = create<UserStore>((set) => ({
    role: Role.NULL,
    setRole: (role: Role) => set({ role }),

    userAddress: "",
    setUserAddress: (userAddress: string) => set({ userAddress }),
}));

export const useHandleComplaintStore = create<HandleComplaintStore>((set) => ({
    complaint: null,
    setComplaint: (complaint: Complaint) => set({ complaint }),
}));
