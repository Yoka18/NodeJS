export const authMiddleware = (req, res, next)=>{
    if(req.session.username){
        res.redirect('/')
    }
    next()
}