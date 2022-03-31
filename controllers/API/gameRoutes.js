const router = require('express').Router();
const { User } = require('../../models');

router.get('/money',async (req,res) =>{

    try {

        if (!req.session.logged_in) {
            res.status(401).json("User is not logged in");
            return
        }else{
            const bank = await User.findByPk(req.session.user_id);
            let total = bank.coins;

            res.status(200).json({coins:total});
        }
    }catch(err){
        console.log(err);
        res.status(400);
    }



})


router.put('/dice', async (req, res) => {
    try {

        if (!req.session.logged_in) {
            res.status(401).json("User is not logged in");
            return
        }else{
            const bank = await User.findByPk(req.session.user_id);

            let D = Math.floor(Math.random() * 6)+1;//roll the die
            let B = req.body.bet;//get the user's bet (1, 2, 3, 4, 5, 6, even or odd as a string)
            let winLose;//outcome of game, true if the user wins
            let sum = req.body.sum;//sum of money the user is betting
            let total = bank.coins;//total money available to the user
            let gain;//amount gained or lost by the user in this game





            if (!bank) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
            }
            if (bank.coins<sum){
                res.status(200).json({ message: 'You is broke my friend' });
                return;
            }
            

 
            
            


            //check if the user won or lost
            if((B=="even"&&D%2==0)||(B=="odd"&&D%2==1)){
                winLose=true;
                gain=1*sum;
            }else if(B==D){
                winLose=true;
                gain=5*sum;
            }else {
                winLose=false;
                gain=-1*sum;
            }

            //update user's number of coins

            total+=gain;

            await User.update({
                coins : total},{
                where: {id: req.session.user_id,},
            });

            


            res.status(200).json({bet:B, dice:D, win:winLose, coins:total});

            



        }
        
      
    }catch (err){
        res.status(402).json(err);
        console.log(err);
    }

});


module.exports = router;


