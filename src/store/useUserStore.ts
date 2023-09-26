import { create } from "zustand";

interface UserStore {
    role: Role;
    setRole: (role: Role) => void;
}

export enum Role {
    ADMIN = "admin",
    POLICE = "police",
    CITIZEN = "citizen",
}
export const userUserStore = create<UserStore>((set) => ({
    role: Role.POLICE,
    setRole: (role: Role) => set({ role }),
}));
