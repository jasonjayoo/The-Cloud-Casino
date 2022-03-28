const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ include: [{ model: User }] });
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// GET ALL POSTS BY USER ID
router.get('/user/:id', async (req, res) => {
    try {
        const userPosts = await User.findByPk(req.params.id, { include: [{ model: Post }] });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// GET ONE POST BY POST ID WITH COMMENTS
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }, { model: Comment }]
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(400).json(err);
    }
});

// CREATE NEW POST
router.post('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const newPost = await Post.create(req.body);
        res.status(200).json(newPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});

// UPDATE ONE POST BY ID
router.put('/:id', async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (!updatedPost) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE POST BY ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: { id: req.params.id }
        });
        res.status(200).json(deletedPost);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err)
    }
});

module.exports = router;


