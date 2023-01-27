
const valid = require("../validation/validation")
const userModel = require("../models/userModel");
const jwt = require('jsonwebtoken')


const userRegister = async function (req, res) {
    try {
        const userData = req.body;
        let { name, phone, title, password, email } = userData;

        userData.name = name.trim()
        phone = userData.phone = phone.trim()
        title = userData.title = title.trim()
        password = userData.password = password.trim()
        email = userData.email = email.trim()
        
        if (Object.keys(userData).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "provide key" });
        }

        if (!title) {
            return res
                .status(400)
                .send({ status: false, message: "title is mandatory" });
        }

        if (!["Mr", "Mrs", "Miss"].includes(title)) {
            return res
                .status(400)
                .send({ status: false, message: "please provide valid title" });
        }

        if (!name) {
            return res
                .status(400)
                .send({ status: false, message: "name is mandatory" });
        }

        if (typeof (name) != "string") {

            return res
                .status(400)
                .send({ status: false, message: "name must be in string" });

        }


        if (!phone) {
            return res
                .status(400)
                .send({ status: false, message: "phone is mandatory " });
        }

        if (typeof (phone) != "string") {
            return res
                .status(400)
                .send({ status: false, message: "enter valid phone number" })
        }
        if (!valid.phoneValid(phone)) {
            return res
                .status(400)
                .send({ status: false, message: "enter valid phone number" });
        }
        const phoneExist = await userModel.findOne({ phone: phone });
        if (phoneExist) {
            return res
                .status(400)
                .send({ status: false, message: "phone is already exist" });
        }
        if (!email) {
            return res
                .status(400)
                .send({ status: false, message: "email is mandatory" });
        }

        if (!valid.emailValid(email)) {
            return res
                .status(400)
                .send({ status: false, message: "enter valid email id" });
        }
        const emailExist = await userModel.findOne({ email: email });
        if (emailExist) {
            return res
                .status(400)
                .send({ status: false, message: "email is already exist" });
        }

        if (!password) {
            return res
                .status(400)
                .send({ status: false, message: "password is mandatory" });
        }

        if (!valid.passwordValid(password)) {
            return res
                .status(400)
                .send({ status: false, message: "Password should contain atleast 1 lowercase, 1 uppercase, 1 numeric ,1 special character, range between 8-12" });
        }
        const registeredData = await userModel.create(userData);
        res
            .status(201)
            .send({ status: true, message: "Success", data: registeredData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}



const userLogin = async function(req,res){
    try {
        let data = req.body
        let {email, password} = data
        if(Object.keys(data).length==0){
            return res.status(400).send({status: false, message: "Please provide mandatory details"})
        }
        if(!email){
            return res.status(400).send({status: false, message: "Please provide email-id"})
        }
        if (!valid.emailValid(email)) {
            return res
              .status(400)
              .send({ status: false, message: "please provide valid email id" });
          }
        if(!password){
            return res.status(400).send({status: false, message: "Please provide password"})
        }

        if (!valid.passwordValid(password)) {
            return res
              .status(400)
              .send({ status: false, message: "Please provide valid password" });
          }
        
        const userDetail = await userModel.findOne({email:email, password: password})
        if(!userDetail){
            return res.status(400).send({status: false, message: "invalid login credential"})
        }

        let payLoad = {userId : userDetail._id}

        let token = jwt.sign(
            payLoad ,
        "secretKeyProject4", {expiresIn : "1h" })

        res.status(200).send({status: true, message:"successfully login", data: token})

    } catch (error) {
        res.status(500).send({status: false, message: error.message})
    }
}



module.exports = { userRegister, userLogin }