const { Blog } = require("../models/Blog.js");
const blogsService = require("../services/bolgsService.js");

const createBlog = async (req, res) => {
  try {
    let newBlog = await blogsService.createBlog(req.body);
    if (newBlog) {
      res.status(201).json({ blog: newBlog });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getBlog = async (req, res) => {
    try {
    
     let blog = await blogsService.getBlog(req.params.id);
      if (blog) {
        return res.status(200).json({ blog });
      }
      if (!blog) {
        return res.status(404).json({ message: "blog not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


  const deleteBlog = async (req, res) => {
    try {
      let deleteBlog = await blogsService.deleteBlog(req.params.id);
      if (!deleteBlog) {
        return res.status(404).json({ message: "Blog not found" });
      }
      if (deleteBlog) {
        res.status(200).json({ delete: deleteBlog });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  
  const updateBlog = async (req, res) => {
    try {
      let updateBlog = await blogsService.updateBlog(req.params.id, req.body);
      if (updateBlog) {
        res.status(201).json({ blog: updateBlog });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

 
  const createComment = async (req, res) => {
    try {
      let newComment = await blogsService.createComment(req.params.id, req.body);
      if (newComment) {
        res.status(201).json({ comment: newComment });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };





module.exports = {
    createBlog,
    getBlog,
    deleteBlog,
    updateBlog,
    createComment
};
