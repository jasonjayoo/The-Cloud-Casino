const router = require("express").Router();
const { user } = require("../models"); ///Need?

//RENDER HOMEPAGE
router.get("/", async (req, res) => {
  try {
    res.render("home", {
      pageTitle: "", ////////////////////////////////////////////////////////////////////ADD SOMETHING HERE IF WE WANT
      loggedIn: req.session.logged_in,
      //posts
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//RENDER SIGNUP PAGE
router.get("/signup", async (req, res) => {
  try {
    res.render("signup", {
      pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">Sign Up</h1>',
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER LOGIN PAGE
router.get("/login", async (req, res) => {
  try {
    res.render("login", {
      pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">Log In</h1>',
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard", {
      pageTitle:
        '<h1 class="px-3 py-2 d-inline" id="homepage">Casino Lobby</h1>',
      loggedIn: req.session.logged_in,
      //posts
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//RENDER DICE5 PAGE
router.get("/dice5", async (req, res) => {
  try {
    res.render("dice5", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER DICE10 PAGE
router.get("/dice100", async (req, res) => {
  try {
    res.render("dice100", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER DICE10 PAGE
router.get("/dice500", async (req, res) => {
  try {
    res.render("dice500", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER DICE10 PAGE
router.get("/dice1000", async (req, res) => {
  try {
    res.render("dice1000", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER DICE10 PAGE
router.get("/dice10", async (req, res) => {
  try {
    res.render("dice10", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER EMAIL COINS PAGE
router.get("/bonus/:id", async (req, res) => {
  try {
    const face = await user.findByPk(req.params.id);
    if (!face) {
      res.render("bonus", {
        pageTitle: "",
        coinCollect: `<h2>Sorry but there seems to be an error with the link.</h2>`,
        loggedIn: req.session.logged_in,
      });
    } else if (face.coincode == 1) {//if money has already been claimed, let them know
      res.render("bonus", {
        pageTitle: "",
        coinCollect: `<h2>It seems that you have already collected your free coins.</h2>`,
        loggedIn: req.session.logged_in,
      });
    } else {
      res.render("bonus", {//if money has not been claimed, generate button to claim it
        pageTitle: "",
        coinCollect: `<button type='button' id='N26' onclick=getBonus(${req.params.id})>Click here to acquire your coins</button>`,
        loggedIn: req.session.logged_in,
      });
    }
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

//RENDER AD PAGE
router.get("/adForCoin", async (req, res) => {
  try {
    res.render("adForCoin", {
      pageTitle: "",
      loggedIn: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status.apply(500).json(err);
  }
});

module.exports = router;
