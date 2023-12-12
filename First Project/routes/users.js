import express from 'express';
const router = express.Router();

router.get("/", (req, res ) => {
    res.send(`users listesi`)
})



router.get("/:slug", (req, res ) => {
    res.send(`${req.params.slug} adlı kullanıcının sayfasındasınız`)
})


export default router;