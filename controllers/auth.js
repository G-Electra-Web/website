// Render Pages
exports.signupGet = (req, res) => {
  res.render('signup', { title: 'SignUp | G Electra', style: 'signup.css' });
};

exports.signinGet = (req, res) => {
  res.render('signin', { title: 'SignIn' , style: 'signup.css'});
};

// Handle POST

exports.signupPost = async (req, res) => {
  const { name, email, password, confirmPassword, regnum } = req.body;

  if (!email || !password || !confirmPassword || !name || !regnum) {
    return res.status(400).render('signup', { error: 'All fields are required', title: 'SignUp | G Electra', style: 'signup.css' });
  }
  if (password !== confirmPassword) {
    return res.status(400).render('signup', { error: 'Passwords do not match', title: 'SignUp | G Electra', style: 'signup.css' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.login.create({
      data: { name, email, role: 'STUDENT', isEmailVerified: false, passwordhash: hashedPassword },
    });

    await prisma.student.create({
      data: { name, email, regno: regnum, projects: [] }
    });
    
    res.redirect('/signin');
  } catch (error) {
    res.status(500).render('signup', { error: 'Error creating user, possibly email already in use', title: 'SignUp | G Electra', style: 'signup.css' });
  }
};

exports.signinPost = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).render('signin', { error: 'All fields are required', title: 'SignIn' });
  }

  try {
    const user = await prisma.login.findFirst({ where: { email } });
    if (user && await bcrypt.compare(password, user.passwordhash)) {
      req.session.user = user;
      return res.redirect('/dashboard');
    } else {
      return res.status(401).render('signin', { error: 'Invalid email or password.', title: 'SignIn' });
    }
  } catch (error) {
    return res.status(500).render('signin', { error: 'Something went wrong, please try again.', title: 'SignIn' });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/');
  });
};



