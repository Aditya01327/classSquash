import { createTransport } from "nodemailer";


// type cMailType = (reciverEmail: string, emailSubject: string, emailContent: string) => Promise<void>;


export const cMail = async (reciverEmail:string, emailSubject:string, emailContent:string) => {
    const transporter = createTransport({
        service: process.env.EMAIL_SERVICE,
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD, //  This password is generated after 2factor auth and then go to app passwords
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: reciverEmail,
        subject: emailSubject,
        text: emailContent,
    };

    await transporter.sendMail(mailOptions, function (error:any) {
        if (error) {
            console.log(error);
        }
        else{
            console.log("Email sent: " + mailOptions.to);
        }
    });
};