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
