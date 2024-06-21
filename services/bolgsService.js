const { Blog } = require("../models/Blog.js");


async function createBlog(body) {
    console.log("User body: ", userBody);

  try {
    const newBlog = new Blogs(body);
    const result = await newBlog.save();
    return result;
  } catch (error) {
    console.error("Error creating movie: ", error.message);
    throw error;
  }
}

const getBlog = async (blogId) => {
  try {
    let blog;
    // Show comments under each blog post - using populate method
    if (blogId) {
      blog = await Blogs.findOne({ _id: blogId }).populate("comments");
    } else {
      blog = await Blogs.find().populate("comments");
    }
    return blog;
  } catch (error) {
    console.error("Error getting blog: ", error.message);
  }
};

const updateBlog = async (blogId, body) => {
    try {
      const updateBlog = await Blogs.findByIdAndUpdate(blogId, body, {
        new: true,
      });
      return updateBlog;
    } catch (error) {
      console.error("Error updating blog: ", error.message);
    }
  };
  
  const deleteBlog = async (blogId) => {
    try {
      console.log("oihi", blogId);
      const deleteBlog = await Blogs.findByIdAndDelete(blogId);
      return deleteBlog;
    } catch (error) {
      console.error("Error deleting blog: ", error.message);
    }
  };


module.exports = {
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog
};
