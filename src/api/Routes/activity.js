const router = require("express").Router();
const { Activity } = require("../models/activity");

router.post("/", async (req, res) => {
  const { email, gameType, score } = req.body;
  const todayDate = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  try {
    let user = await Activity.findOne({ email });

    if (!user) {
      user = new Activity({ email, scores: { [todayDate]: { [gameType]: [score] } } });
    } else {
      user.scores[todayDate] = user.scores[todayDate] || {};
      user.scores[todayDate][gameType] = user.scores[todayDate][gameType] || [];
      user.scores[todayDate][gameType].push(score);
    }

    await user.save();
    res.status(200).json({ message: "Scores added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
