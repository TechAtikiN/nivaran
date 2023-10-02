import z from "zod";

export const officerSchama = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    email: z.string().email({
        message: "Invalid email.",
    }),
    phone: z.string().min(10, {
        message: "Phone number must be at least 10 characters.",
    }),
    location: z.string().min(2, {
        message: "Location must be at least 2 characters.",
    }),
    idCard: z.string().min(2, {
        message: "Id card must be at least 2 characters.",
    }),
    walletAddress: z.string().min(2, {
        message: "Wallet address must be at least 2 characters.",
    }),
});
