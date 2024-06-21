
const express = require("express");
const blogsController = require("../controllers/blogsController");
const authenticateMiddleware = require("../middleware/authethicateToken")
const router = express.Router();

router.post(
  "/",
  authenticateMiddleware,
  blogsController.createBlog
);

router.get(
    "/:id?",
    blogsController.getBlog
  );
  
  router.delete(
    "/:id",
    authenticateMiddleware,
    blogsController.deleteBlog
  );
  
  router.put(
    "/:id",
    authenticateMiddleware,
    blogsController.updateBlog
  )

  router.post("/:id/comments", authenticateMiddleware, blogsController.createComment)


module.exports = router;
