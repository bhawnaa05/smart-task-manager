import { sendMail } from "../../utils/mailer.utils.js";

export const sendAccountCreatedNotification = async ({
    name,
    email,
    password
}) => {

    const subject = "Account Created - Smart Task Manager";

    const text = `
Hello ${name},

You have been registered in Smart Task Manager.

Login Credentials:

Email: ${email}
Password: ${password}

Please login and change your password.

Regards,
Smart Task Manager Team
`;

    await sendMail({
        to: email,
        subject,
        text
    });

};