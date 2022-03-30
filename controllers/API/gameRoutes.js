const router = require('express').Router();
const { User } = require('../../models');


router.put('/dice', async (req, res) => {
    try {


        if (!req.session.logged_in) {
            res.status(400).json("User is not logged in");
            return
        }else{
            const bank = await User.findByPk(req.session.user_id);
            if (!bank) {
                res.status(404).json({ message: 'No post found with this id!' });
                return;
            }
            

 

            let D = Math.floor(Math.random() * 6)+1;
            let B = req.body.bet;//123456evenodd as string
            let win;
        
            if((B=="even"&&D%2==0)||(B=="odd"&&D%2==1)){
                win=true;
            
                await User.update(
                {coins : bank.coins+1*req.body.sum},{
                where: {
                    id: req.session.user_id,
                },
            });
            


            }else if(B==D){
                win=true;
            
                await User.update(
                    {coins :bank.coins+5*req.body.sum}, {
                    where: {
                    id: req.session.user_id,
                    },
            });


            }else {
                win=false;
            
                    await User.update(
                        {coins : bank.coins-1*req.body.sum}, {
                         where: {
                        id: req.session.user_id,
                },
            });


            }
        


            //res.status(200).json(coins.name)
        
        
        
        
            res.status(200).json({dice:D, game:win, ID: req.session.user_id, bet:B, sum:req.body.sum , coins:bank.coins})
        }
        
    } catch (err){
        res.status(400).json(err);
        console.log(err);
    }

});

/*
if (!req.session.logged_in) {
    res.status(400).json("User is not logged in");
    return
}
req.body.user_id = req.session.user_id;

*/

module.exports = router;


