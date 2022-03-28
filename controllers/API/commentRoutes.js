const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// GET ALL COMMENTS BY POST ID
router.get('/post/:id', async (req, res) => {
    try {
        const postComments = await Post.findByPk(req.params.id, { include: [{ model: Comment }] });
        res.status(200).json(postComments);
    } catch (err) {
        res.status(400).json(err);
        console.log(err);
    }
});

// CREATE NEW COMMENT BY POST ID
router.post('/', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const newComment = await Comment.create(req.body);
        res.status(200).json(newComment);
    }
    catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});


// ************************************************************************************

// UPDATE ONE COMMENT BY ID
router.put('/:id', async (req, res) => {
    try {
        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }
        req.body.user_id = req.session.user_id;
        const updateComment = await Comment.update(req.body, {
            where: { id: req.params.id }
        });
        res.status(200).json(updateComment);
    }
    catch (err) {
        console.log(err);
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
