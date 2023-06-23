const { Router } = require("express");
const SessionController = require("../../controllers/sessions.controller");
const passportCustom = require("../../middleware/passport.middleware");
const router = Router();

router.post("/login", SessionController.login);
router.get("/github", passportCustom("github", { scope: ["user:email"] }));
router.get(
  "github/callback",
  passportCustom("github", { failureRedirect: "/github-error" }),
  SessionController.loginGithub
);
router.get("/current", passportCustom("jwt"), SessionController.currentSession);

module.exports = router;