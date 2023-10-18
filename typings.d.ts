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
    status?: string;
    description: string;
    contact: string;
    email: string;
    documents: FileList;
    walletAddress: string;
    location: string;
    time: string;
    date: string;
    firId: string;
    remark: string;
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

type Complaint = {
    complaintId: number;
    walletAddress: string;
    name: string;
    contact: string;
    email: string;
    address: string;
    title: string;
    description: string;
} | null;
