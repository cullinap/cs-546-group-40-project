const express = require("express");
const router = express.Router();
const data = require("../data");
// const bcrypt = require('bcrypt');
// const userData = data.userData

router.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        console.log(username)
        req.session.user = username;
        res.render('posts/private', {user: username})

        // if(await userData.checkUser(username, password)) {
        //     req.session.user = username;
        //     res.render('posts/private', {user: username})
        // } else {
        //     res.status(400).render('posts/login', {title:'error', error:'provide a valid username or passoword'})
        // }

    } catch(e) {
        res.status(400).render('posts/login', {title:'error', error:'provide a valid username or passoword'})
    }
})

router.get('/private', async (req, res) => {
    username = req.body.username

    try {
        res.render('posts/private', {user:username})
    } catch(e) {
        res.status(400).render('posts/login', {title:'error', error:'provide a valid username or passoword'})
    }
})

module.exports = router;