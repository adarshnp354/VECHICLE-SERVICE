const express = require('express')
const router = express.Router();
const Registration = require('../models/registration')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
    let exist = await Registration.findOne({ email: req.body.email });
    if (exist) {
        console.log("email already exist");
        res.status(409).send("Email Already Exist")
        // res.send("acc already exist")

    } else {
        let data = req.body

        data.password = await bcrypt.hash(data.password, 10)

        let acc = new Registration(data)

        acc.save((err, details) => {
            if (err) {
                console.log("error occured" + err);
            } else {
                console.log("Acc created : " + details);
                res.status(200).send(details)
            }
        })
    }

})



router.post('/login', async (req, res) => {

    let logg = req.body
    let exist = await Registration.findOne({ email: logg.email })

    if (exist) {

        bcrypt.compare(logg.password, exist.password).then((same) => {
            if (same) {
                console.log("LOG IN SUCCES FROM SERVER");
                console.log("BCRYPT  SUCCESS");
                const token = jwt.sign({ exist }, 'my_secret_key')

                var info = {
                    "name": exist.name,
                    "address": exist.address,
                    "Mob_no": exist.Mob_no,
                    "email": exist.email,
                    "vehicle_model": exist.vehicle_model,
                    "vehicle_no": exist.vehicle_no,
                    "purchase_date": exist.purchase_date,
                    "warranty_date": exist.warranty_date,
                    "id":exist._id,
                    "token": token
                }
                console.log(info);

                res.status(200).send(info)
                var id=exist._id
                // console.log(id);
                // res.send(id)

                router.get('/user-home/:id',(req,res)=>{
                   
                    // const req_token = req.headers['authorization']
                    // console.log(req_token);

                    // jwt.verify(req_token,'my_secret_key',(err,success)=>{
                    //     if(err){
                    //         console.log(err);
                    //     }else{
                    //         console.log("MANUAL CHECKING");
                    //     }
                    // })

                    Registration.findOne({_id:id})
                    .then((user_info)=>{

                        if(user_info){
                            var send_info = [{
                                "name": user_info.name,
                                "address": user_info.address,
                                "Mob_no": user_info.Mob_no,
                                "email": user_info.email,
                            }]
                        }


                        res.send(send_info)
                    })
                
                    
                })




            } else {
                console.log("passw err says bcrypt");
                var msg ={ "msg":"Please Check Your Password"};
                res.send(msg)
            }

        })

    } else {
        console.log("not registered");
        var msg = { "msg":"Account Not Registered"};
        res.send(msg)
    }


})


//token checking funtion to be added in the below 

// router.get('/user-home/:id',(req,res)=>{
//     Registration.findOne({_id:id})
//     .then((user_info)=>{

//         if(user_info){
//             var send_info = {
//                 "name": user_info.name,
//                 "address": user_info.address,
//                 "Mob_no": user_info.Mob_no,
//                 "email": user_info.email,
//             }
//         }


//         res.send(send_info)
//     })

    
// })



module.exports = router;