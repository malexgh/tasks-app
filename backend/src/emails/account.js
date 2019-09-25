const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'marcio@marcioalexandrino.dev',
    subject: 'Thanks for joining in',
    text: `Welcome to Task Manager, ${name}. Let me know how you get along with the app.`,
  });
};

const sendGoodbyeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'marcio@marcioalexandrino.dev',
    subject: 'Thanks for using the app',
    text: `${name}, let me know why you are leaving Task Manager.`,
  });
};

module.exports = { sendWelcomeEmail, sendGoodbyeEmail };
