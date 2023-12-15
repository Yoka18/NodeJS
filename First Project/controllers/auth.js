import { validationResult } from "express-validator"

export const getRegisterController = (req, res) =>{
    res.render('auth/register')
}

export const postRegisterController = (req, res) => {
    res.locals.formData = req.body
    const errors = validationResult(req);

/*
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        })
    }
*/
    res.render('auth/register', {
        errors: errors.array()
    })
}




export const getLoginController = (req, res) => {
    res.render('auth/login')
}

export const postLoginController = (req, res) => {
    const {username, password} = req.body;
    res.locals.formData = req.body
    let error;
    if(!username){
        error = "Kullanıcı adı boş olamaz"
    } else if(!password){
        error = "Şifre boş olamaz"
    }else if(username !== "admin" || password !== "123"){
        error = "Kullanıcı adı veya şifre hatalı"
    }else{
        req.session.username = username;
        res.redirect('/')
    }
    
    res.render('auth/login', {
        error
    })
}


export const getLogoutController = (req, res) =>{
    req.session.destroy()
    res.redirect('/')
}
