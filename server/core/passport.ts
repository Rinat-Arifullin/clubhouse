import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import { User } from "../../models";

passport.use(
  "github",
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async (_, __, profile, done) => {
      try {
        console.log(profile);
        const userObj = {
          fullname: profile.displayName,
          avatarUrl: profile.photos?.[0].value,
          isActive: 0,
          username: profile.username,
          phone: "",
        };

        const findUser = await User.findOne({
          where: {
            username: userObj.username,
          },
        });

        if (!findUser) {
          const user = await User.create(userObj);
          console.log(user.get({ plain: true }));
          return done(null, user.get({ plain: true }));
        }

        done(null, findUser);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    err ? done(err) : done(err, user);
  });
});

export { passport };
