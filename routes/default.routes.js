import {Router} from "express";

const router = Router();

router.get("/", (req,res) => {
    res.render("index.ejs");
});
router.get("/users", (req,res) => {
    res.redirect("/api/users/login");
})
router.get("/drivers", (req,res)=>{
    res.redirect("/api/drivers/login");
})

export default router;
