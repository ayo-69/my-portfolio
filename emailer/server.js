
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const { name, email, message, budget } = req.body;

    // Create a transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,          // or 587 (see below)
        secure: true,
        auth: {
            user: 'isaachayab0@gmail.com', // Replace with your email
            pass: 'mqjt ywtz xpig eueq', // Replace with your password
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Your Name" <your-email@gmail.com>', // sender address
        to: 'isaachayab0@gmail.com', // list of receivers
        subject: 'New Portofolio Contact Form Submission', // Subject line
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nBudget: ${budget}`, // plain text body
        html: `<b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>Message:</b> ${message}<br><b>Budget:</b> ${budget}` // html body
    };

    // Send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
            res.status(500).send('Something went wrong.');
        }
        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Email sent successfully.');
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
