const axios = require("axios");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

console.log("database_URL", process.env.DATABASE_URL);

exports.redirectToGitHub = (req, res) => {
  const redirectUri = "https://xelo-api.onrender.com/github/callback";
  const clientId = process.env.GITHUB_CLIENT_ID;

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&scope=repo,user,delete_repo`;

  console.log("Redirecting to GitHub for authentication...");
  res.redirect(githubAuthUrl);
};

exports.handleGitHubCallback = async (req, res) => {
  const { code } = req.query;
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  console.log("Received authorization code:", code);

  try {
    const { data: tokenResponse } = await axios.post(
      `https://github.com/login/oauth/access_token`,
      null,
      {
        params: {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        headers: {
          Accept: "application/json",
        },
      },
    );

    const accessToken = tokenResponse.access_token;
    console.log("Access token obtained:", accessToken);

    const { data: userData } = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("User data fetched from GitHub:", userData);

    const existingUser = await prisma.user.findUnique({
      where: { githubId: userData.id.toString() },
    });

    if (existingUser) {
      console.log(
        "User already exists. Skipping creation and repository fetching.",
      );
    }

    const user = await prisma.user.upsert({
      where: { githubId: userData.id.toString() },
      update: {},
      create: {
        githubId: userData.id.toString(),
        name: userData.name,
        username: userData.login,
        avatarUrl: userData.avatar_url,
      },
    });

    const reposResponse = await axios.get(userData.repos_url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const repositories = reposResponse.data;

    for (const repo of repositories) {
      await prisma.repository.upsert({
        where: {
          name_userId: {
            userId: user.id,
            name: repo.name,
          },
        },
        update: {},
        create: {
          name: repo.name,
          language: repo.language || "",
          url: repo.html_url,
          userId: user.id,
          createdAt: new Date(repo.created_at),
        },
      });
    }

    res.redirect(
      `https://xelo.onrender.com?githubId=${
        userData.id
      }&access_token=${encodeURIComponent(accessToken)}`,
    );
  } catch (error) {
    console.error("Error during GitHub OAuth flow:", error);

    if (error.response) {
      res.status(error.response.status).json({ error: error.response.data });
    } else {
      res.status(500).json({ error: "Authentication failed" });
    }
  }
};
