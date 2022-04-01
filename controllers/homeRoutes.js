const router = require('express').Router();
const { User, Post, Comment } = require('../models');

//GET ALL POSTS & RENDER HOMEPAGE
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({ include: [{ model: User }] });
        let posts = dbPostData.map((post) => {
            post = post.get({ plain: true });
            console.log(post);
            date = post.date_created.split('-');
            post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
            post.name = post.user.name;
            return post;
        });
        res.render('home', {
            pageTitle: "The Cloud Casino",
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//RENDER SIGNUP PAGE
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { pageTitle: "The Cloud Casino" });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER LOGIN PAGE
router.get('/login', async (req, res) => {
    try {
        res.render('login', { pageTitle: "The Cloud Casino" });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER CREATE NEW POST PAGE
router.get('/create', async (req, res) => {
    try {
        res.render('create', {
            pageTitle: "My Dashboard",
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER UPDATE POST BY ID PAGE
router.get('/update/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { raw: true });
        res.render('update', {
            pageTitle: "My Dashboard",
            loggedIn: req.session.logged_in,
            post
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});

//RENDER DASHBOARD
router.get('/dashboard', async (req, res) => {
    try {
        const dbPostData = await User.findByPk(req.session.user_id, { include: [{ model: Post }] });
        let posts = [];
        if (dbPostData && dbPostData.posts && dbPostData.posts.length) {
            posts = dbPostData.posts.map((post) => {
                post = post.get({ plain: true });
                post.name = dbPostData.dataValues.name;
                date = post.date_created.split('-');
                post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
                return post;
            });
        }
        res.render('dashboard', {
            pageTitle: "My Dashboard",
            loggedIn: req.session.logged_in,
            posts
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//RENDER COMMENT ON ONE POST BY ID
router.get('/comment/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment, include: [User] }]
        });

        if (postData===null){
            res.status(404).json('Post not found');
            return;
        }

        post = postData.dataValues;
        post.author = postData.dataValues.user.name;
        delete post.user;
        comments = post.comments;

        comments = comments.map((comment)=>{
            comment = comment.get({plain:true});
            comment.commentor_name=comment.user.name;
            delete comment.user;
            date = comment.date_created.split('-');
            comment.date_created = `${date[1]}/${date[2]}/${date[0]}`;
            return comment;
        }
        );

        post.comments=comments;
        date = post.date_created.split('-');
        post.date_created = `${date[1]}/${date[2]}/${date[0]}`;
        console.log(post);

        res.render('comment', {
            pageTitle: "My Dashboard",
            loggedIn: req.session.logged_in,
            post
        });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

//some stuff above this line will eventually get deleted//////////////////////////////////////////////////////////////////


//RENDER DICE5 PAGE
router.get('/dice5', async (req, res) => {
    try {
        res.render('dice5', {
            pageTitle: "$5 Dice",
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
            pageTitle: "$10 Dice",
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
            pageTitle: "Earn Free Coins",
            loggedIn: req.session.logged_in
        });
    }
    catch (err) {
        console.log(err);
        res.status.apply(500).json(err);
    }
});


module.exports = router;