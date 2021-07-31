const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/Vechicle_Service", { useNewUrlParser: true , useUnifiedTopology: true} ,(err) => {
    if (err) {
        console.log("Connection Error Occured");
    } else {
        console.log("Sucessfully Connected To DB");
    }
})

var RegistrationSchema = new Schema({
    name: String,
    password: String,
    confirm_password: String,
    address: String,
    // Mob_no: {
    //     type:String,
    //     required: true,
    //     match: "(0|91)?[7-9][0-9]{9}",
    //     unique: true,
    //     message:"Error TYPE MOB"
    // },
    Mob_no: String,
    // email: {
    //     type: String,
    //     required: true,
    //     match: /.+\@.+\..+/,
    //     unique: true,
    //     message:"Error TYPE email"
    // },
    email:String,
    vehicle_model: String,
    vehicle_no: String,
    purchase_date: String,
    warranty_date: String,
    Security_Qn: String
});

var Registration = mongoose.model("register", RegistrationSchema);
module.exports = Registration;