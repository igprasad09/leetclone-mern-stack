const express = require("express");
const routes = express.Router();
const {programsDB, programinfoDB} = require("../models/db")

routes.get("/", async(req, res)=>{
    const programs = await programsDB.find();
    return res.json({
         programs
    })
});

routes.post("/programinfo", async(req, res)=>{
    const id = req.body.id;
    const programinfo = await programinfoDB.findOne({id});
    return res.json({
        info: programinfo
    })
})

module.exports = routes;