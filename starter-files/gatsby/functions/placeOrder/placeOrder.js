const nodemailer = require('nodemailer');

const generateOrderEmail = ({ order, total }) => {
  const email = `<div><h2>Your Recent order for ${total}</h2><p>Please start walking over, we will have your order ready in the next 20 minutes.</p><ul>${order.map(
    (item) =>
      `<li><img src="${item.thumbnail}" alt="${item.name}"/> (${item.size}) ${item.name} - ${item.price}</li>`
  )}</ul><p>Your total is <strong>${total}</strong> at pickup.</p></div>
  <style>
  ul {
    list-style: none;
  }
  </style>
  `;

  return email;
};

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const wait = async (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  // Check if they filled out the honeypot
  if (body.maple) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Boop beep bep zzzzssst Error Error Eerooo..., Good bye robot ERR - 343459`,
      }),
    };
  }
  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Ooops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // Make sure they actualy have item in the order
  if (body.order.length < 1) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `You forgot to select pizza, why would you order nothing?`,
      }),
    };
  }

  // send the email
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
