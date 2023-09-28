enum Role {
    ADMIN = "Admin",
    POLICE = "Police",
    NULL = 0 as const,
}

type FIR = {
    id: number;
    description: string;
    status: string;
    victimName: string;
    phone: string;
    date: string;
};
