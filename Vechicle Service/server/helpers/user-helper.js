// // const Registration = require('../models/registration')

// // const bcrypt = require('bcrypt')
// // const jwt = require('jsonwebtoken')


// module.exports = {

//     Register: async (user_data) => {

//         let exist = await Registration.findOne({ email: user_data.email });
//         if (exist) {
//             console.log("email already exist");
        
//             // res.send("acc already exist")
//             return msg
//         } else {

//             let data = user_data

//             data.password = await bcrypt.hash(data.password, 10)
    
//             let acc = new Registration(data)
    
//             acc.save((err, details) => {
//                 if (err) {
//                     console.log("error occured" + err);
//                 } else {
//                     console.log("Acc created : " + details);
//                     // res.status(200).send(details)
//                     return (details)
//                 }
//             })
//         }

  

//     }

// }

