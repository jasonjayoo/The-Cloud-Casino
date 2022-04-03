const router = require('express').Router();
const { User } = require('../../models');


//verify that name is unique
router.get('/check/:id', async(req,res)=>{

    try{
        const Aname = await User.findOne({ where: { name: req.params.id }});
        if(!Aname) {
            res.status(200).json({ message: 'hi' });
            return;
        }
        else {
            res.status(298).json({ message: 'hello' });
            return;
        }
    }catch(err){
        res.status(500).json({ message: 'ok' });
        console.log(err);
        return;
        
    }

});


//SIGNUP NEW USER - WORKS
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        let Body = {
            name: req.body.name,
            password: req.body.password,
            coins: 500
        }
        const userData = await User.create(Body);
        

        req.session.save(() => {
            //add new key-value pairs to req.session
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

//SIGNUP NEW USER - WORKS
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        let Body = {
            name: req.body.name,
            password: req.body.password,
            coins: 500
        }
        const userData = await User.create(Body);
        

        req.session.save(() => {
            //add new key-value pairs to req.session
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

/*"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);*/







//EXISTING USER LOGIN
router.post('/login', async (req, res) => {
    try {
        if (!req.body.name||!req.body.password) {
            res.status(400).json({message: 'Insufficient user data'})
            return;
        }

        const userData = await User.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again.' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect username or password. Please try again.' });
            return;
        }

        req.session.save(() => {
            //add new key-value pairs to req.session
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json({error: err, message: 'Something went wrong'});
        console.log(err);
    }
});

//LOGOUT
router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
