const router = require('express').Router();
const { user } = require('../../models');


//start playing video
router.put('/coins1',async (req,res) =>{

    try {

        if (!req.session.logged_in) {
            res.status(401).json("user is not logged in");
            return


        }else{ 

            
            const watcher = await user.findByPk(req.session.user_id);
            
            if(watcher.videoon==2){//check that the user is not already watching the video in another tab
                res.status(400)

            }else{

                let RANDO = Math.floor(Math.random()*10000000);

                await user.update({//create temp coupon and set the status to "watching"
                    tempCoupon : RANDO,
                    videoon : 2,
                },{
                    where: {id: req.session.user_id,},
                });


                setTimeout(()=>{//after ten seconds set status to "not watching"
                    user.update({
                        videoon : 1,
                    },{
                        where: {id: req.session.user_id,},
                    });;
                },10*1000);




                setTimeout(()=>{//after 15 seconds return the temporary coupon to get coins
                    res.status(200).json({coupon:RANDO});
                },15*1000);

            }

            
        }
    }catch(err){
        console.log(err);
        res.status(400);
    }



})

router.put('/coins2',async (req,res) =>{

    try {

        if (!req.session.logged_in) {
            res.status(401).json("user is not logged in");
            return
        }else{ 

            const check = await user.findByPk(req.session.user_id);
            let RANDO = check.tempCoupon;//check that the coupon matches

            await user.update({//erase the coupon
                tempCoupon : 0},{
                where: {id: req.session.user_id,},
            });

            if(!(RANDO==req.body.v)){
                res.status(404).json({message:'Problem authenticating ad playing'});

            }else{

                const bank = await user.findByPk(req.session.user_id);//get user
                let total = bank.coins+50;//get present amount of coins and add 50
                await user.update({//set new amount of coins
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
