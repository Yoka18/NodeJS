import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";
import dotenv from "dotenv";
import session from "express-session";

dotenv.config();

//routes
import usersRouter from "./routes/users.js";
import authRouter from "./routes/auth.js";


const app = express();
const port = process.env.PORT || 3001;
const __dirname = path.resolve();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
// post işlemleri boş gelmemesi için
app.use(express.urlencoded( { extended:true } ));
app.use(express.json());
app.use(expressLayouts);


app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        // cookie: {
        //     secure: true
        // }
    })
)

app.use((req, res, next) =>{
    res.locals.session = req.session;
    next()
})


app.get("/",(req, res) =>{
    res.render('index', {
        title: "Anasayfa",
        desc: "Bu bir Anasayfadır",
    });
})


app.use('^/auth', authRouter)




/*

app.get("/contact",(req, res) =>{
    res.render('contact', {
        title: "İletişim",
        desc: "Bu bir iletişim sayfasıdır",
    });
})

app.post("/contact", (req, res) =>{
    const {name} = req.body;
    res.render('contact', {
        title: "İletişim",
        desc: `Merhaba ${name}`
    })
})

*/

app.use('/users', usersRouter)


app.use((req, res)=>{
    res.status(404).send("404 nor found")
})

app.listen(port, () =>{
    console.log(`sunucu http://localhost:${port} üzerinden çalışıyor`)
})