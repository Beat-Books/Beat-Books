const User = require('../models/userModel');

const userController = {};

// create a new user in DB
userController.createUser = (req, res, next) => {
    const { username, password } = req.body;
    // STRETCH: ask for user songs and books
    User.create({ username, password }, (err, createdUser) => {
        if (err) {
            return next({
                log: 'an error occurred in the createUser middleware function',
                message: {err: err},
            });
        } else {
            res.locals.id = createdUser.id;
            return next();
        }
    })
};

// verify user for login
userController.verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    User.findOne({username}, (err, foundUser) => {
        if (err || !foundUser) {
            return res.redirect('/');
          } else {
            foundUser.comparePassword(password, function (err, isMatch) {
              if (err || !isMatch) return res.redirect('/');
              res.locals.id = foundUser._id;
              res.locals.user = foundUser;
              return next();
            });
          }
    });
}

// get user profile
userController.getUserProfile = (req, res, next) => {
  console.log('user id', res.locals.id);
    User.findOne({id: res.locals.id})
    .then( (foundUser) => {
      console.log(foundUser)
      res.locals.userProfile = foundUser;
      return next();
    })
    .catch(err => {
      return next ({
        log: 'an error occurred in the getUserProfile middleware function',
        message: {err: err},
      })
    });
}

module.exports = userController;