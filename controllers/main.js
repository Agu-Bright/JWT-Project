//Check username, password in post(login) request
//if exists create new JWT
//send back to front end

// setup authentication so only the request with JWT can access the dashboard
const CustomAPIError = require('../errors/custom-error')
const JWT = require('jsonwebtoken');

const login = async(req, res)=>{
    const  {username, password} =  req.body;

    if(!username || !password){
        throw new CustomAPIError('provide username and password', 400)
    }
    //Just for demo, normally provide the users ID
    const id = new Date().getDate();

    const token = JWT.sign({id , username}, process.env.JWT_SECRET, {expiresIn: "30d"} )
    
    res.status(200).json({msg:"New User Created", token})
    


}

const dashboard = async (req, res)=>{

    const randomNumber = Math.floor(Math.random() * 100)
    res.status(200).json({msg: `Hello ${req.user.username}`, secret: `Here is your authorized data, your lucky number is ${randomNumber}`})
    



    // // console.log(req.headers);
    // const randomNumber = Math.floor(Math.random() * 100)
    // res.status(200).json({msg: `Hello Bright`, secrete: `Here is your authorized data, your lucky number is ${randomNumber}`})

}

module.exports = {

    login,
    dashboard

}