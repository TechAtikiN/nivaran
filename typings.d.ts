enum Role {
    ADMIN = "Admin",
    POLICE = "Police",
    NULL = 0 as const,
}

type FIR = {
    id: string;
    FIRname: string;
    image: string;
    properties: FIRProperties;
};

type FIRProperties = {
    name: string;
    description: string;
    contact: string;
    email: string;
    documents: FileList;
};

type OfficerMetadata = {
    description: string;
    id: string;
    image: string;
    name: string;
    properties: Officer;
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
