import { body, check } from "express-validator";


export const registerValidation = () => [
    body('username')
    .isLength({min: 3, max: 15})
    .withMessage('Kullanıcı adı en az 3 karakter olmalıdır')
    .isAlphanumeric(),

    body('email')
    .isEmail()
    .withMessage('Geçerli bir email adresi giriniz'),

    body('password')
    .isLength({min: 5})
    .withMessage('Şifre en az 5 karakter olmalıdır'),

    body('passwordConf')
    .custom((value, {req})=>{
        if(value !== req.body.password){
            throw new Error('Şifreler eşleşmiyor')
        }
        return true;
    }),

    check('avatar')
    .custom((value, {req}) => {
        if(!req.files || Object.keys(req.files).length === 0){
            throw new Error("Profil resmi yüklemelisiniz")
        }

        const allowedExtensions = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
        const profileImage = req.files.avatar;
        if(!allowedExtensions.includes(profileImage.mimetype)){
            throw new Error('Profil resmi uzantısı geçersiz')
        }
        
        if(profileImage.size > 5 * 512 * 512){
            throw new Error('Profil resmi boyutu 5MB dan büyük olamaz')
        }

        return true;

    })
]