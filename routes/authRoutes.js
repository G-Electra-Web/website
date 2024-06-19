const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { isAuthenticated } = require('../middleware/authMiddleware');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/signup', authController.signupGet);
router.post('/signup', authController.signupPost);
router.get('/signin', authController.signinGet);
router.post('/signin', authController.signinPost);
router.get('/logout', authController.logout);
router.get("/", (req,res) => {
  res.render("home")
})
router.get('/dashboard', isAuthenticated,  (req, res) => {
  if(req.session.role === "ADMIN"){
    res.render('home', { user: { email: req.session.user }});

  }else{
    res.render('home', { user: req.session.user});
  }
});

module.exports = router;
