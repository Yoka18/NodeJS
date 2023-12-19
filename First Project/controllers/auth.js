import { validationResult } from "express-validator"
import slugify from "slugify"

export const getRegisterController = (req, res) =>{
    res.render('auth/register')
}

export const postRegisterController = (req, res) => {
    res.locals.formData = req.body
    const errors = validationResult(req);

    // hata yoksa
    if(errors.isEmpty()){
        let avatar = req.files.avatar;
        let path = 'uploads/' + Date.now() + slugify(avatar.name);
        avatar.mv(path, (err) => {
            if(err){
                return res.status(500).send(err)
            }

            console.log('Kayıt başarılı')
            res.render('auth/register', {
                errors: errors.array()
            })
        })
    } else {
        res.render('auth/register', {
            errors: errors.array()
        })
    }
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
