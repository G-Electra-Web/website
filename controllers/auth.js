const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signupGet = (req, res) => {
  res.render('signup');
};

exports.signupPost = async (req, res) => {
  const { name, email, password, confirmPassword, regnum } = req.body;

  if (!email || !password || !confirmPassword) {
    return res.status(400).send('All fields are required');
  }
  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.login.create({
      data: { name, email, role: 'STUDENT',isEmailVerified: false, passwordhash: hashedPassword },
    });

    const user  = await prisma.student.create({
      data:{name, email,regno: regnum, projects: []}
    })
  
    res.redirect('/signin');
  } catch (error) {
    res.render('signup', { error: 'Error creating user, possibly email already in use' });  
  }
};

exports.signinGet = (req, res) => {
  res.render('signin');
};

exports.signinPost = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.render('signin', { error: 'All Fields are Requried' });  }
  }

  const user = await prisma.login.findFirst({ where: { email } });
  if (user && (await bcrypt.compare(password, user.passwordhash))) {
    req.session.user = user
    res.redirect('/dashboard');
  } else {
    res.render('signin', { error: 'Invalid email or password.' });  
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};
