const router = require('express').Router();
const { User } = require('../models');///Need?

//RENDER HOMEPAGE
router.get('/', async (req, res) => {
    try {

        res.render('home', {
            pageTitle: '',////////////////////////////////////////////////////////////////////ADD SOMETHING HERE IF WE WANT
            loggedIn: req.session.logged_in,
            //posts
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//RENDER SIGNUP PAGE
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">Sign Up</h1>' });
        
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER LOGIN PAGE
router.get('/login', async (req, res) => {
    try {
        res.render('login', { pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">Log In</h1>' });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        
        res.render('dashboard', {
            pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">Casino Lobby</h1>',
            loggedIn: req.session.logged_in,
            //posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})


//RENDER DICE5 PAGE
router.get('/dice5', async (req, res) => {
    try {
        res.render('dice5', {
            pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">$5 Dice</h1>',
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER DICE5 PAGE
router.get('/dice10', async (req, res) => {
    try {
        res.render('dice10', {
            pageTitle: '<h1 class="px-3 py-2 d-inline" id="homepage">$10 Dice</h1>',
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER AD PAGE
router.get('/adForCoin', async (req, res) => {
    try {
        res.render('adForCoin', {
            pageTitle:'<h1 class="px-3 py-2 d-inline" id="homepage">Earn Free Coins</h1>',
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});


module.exports = router;