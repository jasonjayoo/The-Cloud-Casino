const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
 

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "ignazprotagonist@gmail.com", 
      pass: "S7dxdHbxgU5v9p8", 
    }
  });

 

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "ignazprotagonist@gmail.com", // sender address
    to: "perdusurlalune@hotmail.com", // list of receivers
    subject: "subject2", // Subject line
    text: "Hessdff world?", // plain text body
    html: "<a href='https://boards.4channel.org/sci/'>4chan /sci/ </a>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);