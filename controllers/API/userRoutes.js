const router = require("express").Router();
const { user } = require("../../models");
const nodemailer = require("nodemailer");
require("dotenv").config();


///these urls are for the emailed link
//const ourSite = "http://localhost:3001/"
const ourSite = "https://cloud247casino.herokuapp.com/"; 

//verify that name is unique
router.get("/check/:id", async (req, res) => {
  try {
    const Aname = await user.findOne({ where: { name: req.params.id } });
    if (!Aname) {
      res.status(200).json({ message: "hi" });
      return;
    } else {
      res.status(298).json({ message: "hello" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "ok" });
    console.log(err);
    return;
  }
});

//verify that email is unique
router.get("/checkE/:email", async (req, res) => {
  try {
    const AEmail = await user.findOne({ where: { email: req.params.email } });
    if (!AEmail) {
      res.status(200).json({ message: "hi" });
      return;
    } else {
      res.status(298).json({ message: "hello" });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: "ok" });
    console.log(err);
    return;
  }
});

/////////////////////////////////////////////////////////////////////
//email function/////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////
function sendIt(addy, faceName, faceId) {
  //generate subject and content(link)
  let sub = `Hello ${faceName}, your coins arrived`;
  let coinLink = `<a href='${ourSite}bonus/${faceId}'>Click to get your coins!</a>`;
  let plaintext = "Click to get your coins!";//not used 

  // create reusable transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",//zoho email allows apps to login using only username and password
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ADDY, 
      pass: process.env.MAIL_PW, 
    },
  });

  // send mail with defined transport object
  transporter.sendMail({
    from: process.env.MAIL_ADDY, // sender address
    to: addy, // list of receivers
    subject: sub, // Subject line
    text: plaintext, // plain text body
    html: coinLink, // html body
  });

  return;
}

//email route

router.put("/email", async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(460).json("User is not logged in");
      return;
    } else {
      const AnEmail = await user.findOne({ where: { email: req.body.email } });
      if (!AnEmail) {
        await user.update(
          {
            email: req.body.email,
          },
          {
            where: { id: req.session.user_id },
          }
        );

        const face = await user.findOne({ where: { id: req.session.user_id } });

        sendIt(req.body.email, face.name, face.id);//send the email with user name (for subject) and id (for link)
        res.status(200).json({ awesome: "job" });
        return;
      } else {
        res.status(405).json("Email already in use.");
        return;
      }
    }
  } catch (err) {
    res.status(422).json(err);
    console.log(err);
    return;
  }
});

//COLLECT COINS ROUTE
router.put("/bonus", async (req, res) => {
  try {
    const face = await user.findByPk(req.body.id);

    if (!face) {
      res.status(200).json({ message: "Problem with link" });
      return;
    } else if (face.coincode == 1) {//check that this account has not collected coins (1 is collected, 2 is not collected)
      res
        .status(200)
        .json({ message: "It seems you have already collected your bonus" });//send message 
    } else {
      //update coins
      let total = face.coins + 1000;

      await user.update(
        {
          coincode: 1,
          coins: total,
        },
        {
          where: { id: req.body.id },
        }
      );

      res
        .status(200)
        .json({ message: `Congratulations, you now have ${total} coins!` });//send message
    }
  } catch {
    res.status(400);
  }
});

//SIGNUP NEW USER - WORKS
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    let Body = {
      name: req.body.name,
      password: req.body.password,
      coincode: 2,//coins not collected
      videoon: 1,//video not being watched
      coins: 500,//500 chips to start
    };
    const userData = await user.create(Body);

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

//EXISTING USER LOGIN
router.post("/login", async (req, res) => {
  try {
    if (!req.body.name || !req.body.password) {
      res.status(400).json({ message: "Insufficient user data" });
      return;
    }

    const userData = await user.findOne({ where: { name: req.body.name } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again." });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect username or password. Please try again." });
      return;
    }

    req.session.save(() => {
      //add new key-value pairs to req.session
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json({ error: err, message: "Something went wrong" });
    console.log(err);
  }
});

//LOGOUT
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
