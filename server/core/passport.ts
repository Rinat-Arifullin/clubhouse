import { IUser } from "@pages";
import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github";
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import { createJwtToken } from "../utils/createJWT";
import { User } from "../../models";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY_JWT,
};

passport.use(
  "jwt",
  new JwtStrategy(opts, (jwt_payload, done) => {
    done(null, jwt_payload.data);
  })
);

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
        let userData: IUser;

        const userObj: Omit<IUser, "id"> = {
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
          userData = user.toJSON();
        } else {
          userData = await findUser.toJSON();
        }

        done(null, { ...userData, token: createJwtToken(userData) });
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
