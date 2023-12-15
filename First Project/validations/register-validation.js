import { body } from "express-validator";


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
]