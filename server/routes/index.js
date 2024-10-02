const express = require("express");
const authController = require("../controllers/authController");
const fileController = require("../controllers/filecontroller");

const userController = require("../controllers/userController");
const repoController = require("../controllers/RepoController");

const router = express.Router();

router.get("/files", fileController.getFiles);
router.get("/files/content", fileController.getFileContent);
router.post("/create_file_or_folder", fileController.createFileOrFolder);
router.delete("/delete", fileController.deleteItem);

router.get("/github", authController.redirectToGitHub);

router.get("/github/callback", authController.handleGitHubCallback);

router.get("/user", userController.getUser);
router.get("/repos", repoController.getRepos);
router.post("/create_repos", repoController.createRepo);
router.delete("/deleteRepo", repoController.deleteRepo);
router.post("/getRepoData", repoController.cloneRepo);
router.post("/saveChanges", repoController.runGitSaveCommands);

module.exports = router;
