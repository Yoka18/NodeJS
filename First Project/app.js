import express from "express";
import path from "path";
import expressLayouts from "express-ejs-layouts";


//routes
import usersRouter from "./routes/users.js";


const app = express();
const port = 3000;
const __dirname = path.resolve();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/layout');
app.use(express.urlencoded( { extended:true } ));
app.use(expressLayouts);





app.get("/",(req, res) =>{
    res.render('index', {
        title: "Anasayfa",
        desc: "Bu bir Anasayfadır",
    });
})

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


app.use('/users', usersRouter)


app.use((req, res)=>{
    res.status(404).send("404 nor found")
})

app.listen(port, () =>{
    console.log(`sunucu http://localhost:${port} üzerinden çalışıyor`)
})