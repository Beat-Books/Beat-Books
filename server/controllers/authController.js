const Session = require('../models/sessionModel');

const authController = {};

// authController.startSession
    //create new session object and store in database
authController.startSession = (req, res, next) => {
    const { cookieId } = req.body;
    Session.create({cookieId: res.locals.id}, (err, createdSession) => {
        if (err) {
            return next({
                log: 'an error occurred in the startSession middleware function',
                message: {err: err},
            })
        } else {
            res.locals.session = createdSession;
            return next();
        }
    });
};

// set SSID Cookie
authController.setSSIDCookie = (req, res, next) => {
  // console.log('in set ssid ', res.locals.session.cookieId);
  res.cookie('ssid', res.locals.session.cookieId, {
    httpOnly: true,
    secure: true,
  });
  return next();
};


// authController.endSession
  // find an existing session in DB by user_id and delete it
authController.endSession = (req, res, next) => {
    Session.findOneAndDelete({cookieId: req.cookies.ssid}, (err) => {
        if (err) {
            return next({
                log: 'an error occurred in the endSession middleware function',
                message: {err: err},
            })
        } else {
            return next();
        }
    })
}

// authController.isLoggedIn
// see if an existing session exists in DB for cookieId : req.cookies.ssid
authController.isLoggedIn = (req, res, next) => {
    console.log('checking is loggedin')
    Session.findOne({ cookieId: req.cookies.ssid }, (err) => {
        if (err) {
            return next({
            log: 'an error occurred in the isLoggedIn middleware function',
            message: {err: err},
        })
       } else {
        console.log('user session exists')
        res.locals.id = req.cookies.ssid;
         return next();
       }
    })
}

module.exports = authController;