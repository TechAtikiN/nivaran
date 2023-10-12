import { createTransport } from "nodemailer";

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

// @ts-ignore
export default async function handler(req, res) {
    const { email, name, contact, location, remark, firId } = req.body;

    // html template for mail being sent to organization
    const adminMailFormattedHtml = `
    <h2>Created new FIR with ID: ${firId}</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Location:</strong> ${location}</p>
    <p><strong>Remark:</strong> ${remark}</p>
  `;

    // html template for mail being sent to user
    const victimMailFormattedHtml = `
    <h2>Thank you for contacting us!</h2>
    <p>Your FIR has been successfully registered with ID: ${firId}</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;

    const adminMailData = {
        from: process.env.EMAIL, // sender address
        to: "nikitakhabya03@gmail.com", // admin address
        cc: "techatikin@gmail.com",
        subject: `[Created New FIR]: Nivaran`, // subject line
        html: adminMailFormattedHtml, // html body
    };

    const victimMailData = {
        from: process.env.EMAIL, // sender address
        to: email,
        subject: "FIR Registered", // subject line
        html: victimMailFormattedHtml, // html body
    };

    try {
        const adminMailInfo = await transporter.sendMail(adminMailData); // trigger mail request to us

        const victimMailInfo = await transporter.sendMail(victimMailData); // trigger mail request to user

        return res.status(200).end(
            JSON.stringify({
                message: "Success",
                reqMessageId: adminMailInfo.messageId,
                resMessageId: victimMailInfo.messageId,
            })
        );
    } catch (err) {
        return res.status(500).end(
            JSON.stringify({
                message: "Could not send mail",
            })
        );
    }
}
