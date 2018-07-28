const passport = require('passport');
const { Strategy } = require('passport-local');
const { Application } = require('express');
const Jwt = require('passport-jwt');

passport.use(new Strategy(
    {
        usernameField: 'email',
    },
    async (email, password, done) =>  {
        try {
            const user = await User.findOne({ email });
            
            if (!user) {
                return done(null, false);
            }

            user.comparePassword(password, (err, isMatch) => {
                if (err) { return done(err); }
          
                if (!isMatch) { return done(null, false); }
          
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    })
);

const jwtOptions = {
    jwtFromRequest: Jwt.ExtractJwt.fromHeader('authorization'),
    secretOrKey: 'secret',
  };

passport.use(new Jwt.Strategy(
    jwtOptions,
    async (payload, done) => {
        try {
            const user = await User.findById(payload.sub);
            done(null, user);
        } catch (err) {
            done(err);
        }
    }
));

passport.serializeUser((user, cb) => {
    cb(null, user._id);
});
  
passport.deserializeUser(async (id, cb) => {
    try {
        const user = await User.findById(id);
        return cb(null, user);
    } catch (err) {
        return cb(err);
    }
});