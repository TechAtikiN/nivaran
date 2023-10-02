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
    victimEmail: string;
    phone: string;
    date: string;
};

type OfficerMetadata = {
    description: string;
    id: string;
    image: string;
    name: string;
    properties: {
        id: string;
        walletAddress: string;
        name: string;
        email: string;
        contact: string;
        location: string;
        idCard: FileList;
    };
};

type Officer = {
    id: string;
    walletAddress: string;
    name: string;
    email: string;
    contact: string;
    location: string;
    idCard: FileList;
};
