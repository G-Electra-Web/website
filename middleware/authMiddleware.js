exports.isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/');
    }
  };

exports.isAdmin = (req, res,next) => {
  if(req.session.role === "ADMIN"){
    next()
  }else{
    res.redirect("/")
  }
}
  