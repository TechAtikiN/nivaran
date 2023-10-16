import { stat } from "fs";
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
    const { email, name, contact, location, remark, firId, status } = req.body;
    console.log(req.body);

    // html template for mail being sent to organization
    let adminMailFormattedHtml = ``;

    if (status === "New") {
        adminMailFormattedHtml = `<h2>Created new FIR with ID: ${firId}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Remark:</strong> ${remark}</p>`;
    } else if (status === "Pending" || "Resolved") {
        adminMailFormattedHtml = `<h2>Updated the status of FIR with ID: ${firId} to ${status}</h2>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Remark:</strong> ${remark}</p>`;
    }

    // html template for mail being sent to user
    let victimMailFormattedHtml = ``;

    if (status === "New") {
        victimMailFormattedHtml = `
    <h2>Thank you for contacting us!</h2>
    <p>Your FIR has been successfully registered with ID: ${firId}</p>
    <p><strong>Email:</strong> ${email}</p>`;
    } else if (status === "Pending" || "Resolved") {
        victimMailFormattedHtml = `
    <h2>New Update on the FIR!</h2>
    <p>Your FIR has with ID: ${firId} is updated to <strong>${status}</strong> status</p>
    <p><strong>Email:</strong> ${email}</p>`;
    }

    const adminMailData = {
        from: process.env.EMAIL, // sender address
        to: "nikitakhabya03@gmail.com", // admin address
        cc: "techatikin@gmail.com",
        subject: `FIR on Nivaran`, // subject line
        html: adminMailFormattedHtml, // html body
    };

    const victimMailData = {
        from: process.env.EMAIL, // sender address
        to: email,
        subject: "FIR on Nivaran", // subject line
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
