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

export const sendTaskAssignedNotification = async ({
    managerName,
    email,
    taskTitle
}) => {

    const subject = "New Weekly Task Assigned";

    const text = `
Hello ${managerName},

You have been assigned a new weekly task.

Task: ${taskTitle}

Please login to Smart Task Manager to view details.

Regards,
Smart Task Manager Team
`;

    await sendMail({
        to: email,
        subject,
        text
    });

};