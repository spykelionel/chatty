import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

export default async function login(req, res){
    try {
       const client =  await User.findOne({ name: req.body.name})
       client.then(user=>{
            console.log(user)
            if(user){
                // compare passwords
                bcrypt.compare(req.body.password, user.password, (error, success)=> {
                    if(!success){
                        return res.status(501).json({...error, message: "Error authenticating user"})
                    }
                    const token = jwt.sign({
                    active_user: user.name,
                    id: user._id
                    }, process.env.JWT_SECRET, {expiresIn: "1d"})
                    return res.status(200).json({
                        user,
                        token,
                        status:200,
                        validity: "24h",
                        refreshed: false,
                        created_at: new Date().toJSON("time"),
                    })
                })
                
            }
       })
       .catch({

       })
    } catch (error) {
       return res.status(501).json({...error, message: "Error authenticating user"})
    }
}

const matchUniqueKey = _ =>  new RegExp("E?/\o\g?:12+\wkr?krud+e")