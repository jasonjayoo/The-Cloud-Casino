const router = require('express').Router();
const { User} = require('../../models');



router.put('/coins1',async (req,res) =>{

    try {

        if (!req.session.logged_in) {
            res.status(401).json("User is not logged in");
            return
        }else{ 

            let RANDO = Math.floor(Math.random()*10000000);

            await User.update({
                tempCoupon : RANDO},{
                where: {id: req.session.user_id,},
            });

            setTimeout(()=>{
                res.status(200).json({coupon:RANDO});
            },17*1000)

            
        }
    }catch(err){
        console.log(err);
        res.status(400);
    }



})

router.put('/coins2',async (req,res) =>{

    try {

        if (!req.session.logged_in) {
            res.status(401).json("User is not logged in");
            return
        }else{ 

            const check = await User.findByPk(req.session.user_id);
            let RANDO = check.tempCoupon;

            await User.update({
                tempCoupon : 0},{
                where: {id: req.session.user_id,},
            });

            if(!(RANDO==req.body.v)){
                res.status(404).json({message:'Problem authenticating ad playing'});//do better for the message lol, also display it if that error code

            }else{

                const bank = await User.findByPk(req.session.user_id);//get user
                let total = bank.coins+50;//get present amount of coins and add 50
                await User.update({//set new amount of coins
                    coins : total},{
                    where: {id: req.session.user_id,},
                });

                res.status(200).json({youHave:total});

            }

            
        }
    }catch(err){
        console.log(err);
        res.status(400);
    }


})











module.exports = router;
