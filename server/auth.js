var passport = require("passport");
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromUrlQueryParameter("token")
};
const models = require("./models");
const User = models.User;
const sequelize = models.sequelize;

module.exports = function() {
    var strategy = new Strategy(params, function(payload, done) {
        User.findById(payload.id).then(user => {
            if (user) {
                return done(null, {
                    id: user.id
                });
            } else {
                return done(new Error("User not found"), null);
            }
        });
    });
    passport.use(strategy);
    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", { session: false });
        }
    };
};
