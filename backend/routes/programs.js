const express = require("express");
const routes = express.Router();

routes.get("/", async(req, res)=>{
     
    return res.json({
         message: "ok"
    })
})

module.exports = routes;