const nodemailer = require('nodemailer');

const sendMail = async (type, args, email) => {
    try {
        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        let testAccount = await nodemailer.createTestAccount();

        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.anatra.o2switch.net",
            port: 465,
            secure: false,
            auth: {
                user: "mspr@jeda1059.odns.fr", // generated ethereal user
                pass: "Mspr8523.", // generated ethereal password
            },
        });

        let info;

        if (type === "accountVerification") {
            const { code } = args;

            // send mail with defined transport object
            info = await transporter.sendMail({
                from: '"MyAPI 👻" <myapi@example.com>', // sender address
                to: email, // list of receivers
                subject: "Account verification ✔", // Subject line
                text: `Your account verification code is : ${code}.`, // plain text body
                html: `<b>Your account verification code is : ${code}.</b>`, // html body
            });

        }

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    } catch (error) {
        return console.error(error);
    }
}

module.exports = {
    sendMail
}