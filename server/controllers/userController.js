const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getUser = async (req, res) => {
  try {
    const { githubId } = req.query;

    if (!githubId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const user = await prisma.user.findUnique({
      where: { githubId: githubId },
      select: {
        id: true,
        githubId: true,
        name: true,
        username: true,
        avatarUrl: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching User", error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
