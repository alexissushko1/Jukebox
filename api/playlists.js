const express = require("express");
const router = express.Router();
const prisma = require("../prisma/client");

router.get("/", async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (e) {
    console.log(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, description, ownerId, trackIds } = req.body;

    if (!name || !ownerId || !trackIds) {
      console.log("this is the error");
    }
    const tracks = trackIds.map((id) => ({ id: +id }));
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: +ownerId,
        tracks: { connect: tracks },
      },
    });
    res.status(201).json(playlist);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
