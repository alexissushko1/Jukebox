const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res, next) => {
  console.log("reached /users");
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    console.log(e);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id },
      include: { playlists: true },
    });
    res.json(user);
  } catch (e) {}
});

module.exports = router;
