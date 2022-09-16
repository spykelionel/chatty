import jwt from 'jsonwebtoken'

export default function(req, res, next){
    try {
        const token = req.headers['Authorization'].split(' ')[1]
        req.userData = jwt.verify(token, process.env.JWT_SECRET)
        // next(req.userData)
        next()
    } catch (error) {
        return res.status(501).json({...error, message: "Error verifying user"})
    }
}