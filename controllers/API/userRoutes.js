const router = require('express').Router();
const { User } = require('../../models');


//verify that name is unique
router.get('/check/:id', async(req,res)=>{

    try{
        const Aname = await User.findOne({ where: { name: req.params.id }});
        if(!Aname) {
            res.status(200).json({ message: 'fukfuk' });
            return;
        }
        else {
            res.status(298).json({ message: 'fukaaaaaafuk' });
            return;
        }
    }catch(err){
        res.status(500).json({ message: 'ferrrrork' });
        console.log(err);
        return;
        
    }

});


//SIGNUP NEW USER - WORKS
router.post('/signup', async (req, res) => {
    try {
        console.log(req.body)
        const userData = await User.create(req.body);
        

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
