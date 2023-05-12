import Blog from "../model/blog";

export const getAllBlogs = async (req, res, next) => {
  let blogs;
  try {
    blogs = await Blog.find();
    // .populate("user");
  } catch (err) {
    console.log(err);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No blog found" });
  }
  return res.status(200).json({ blogs });
};

export const addblog = async (req, res, next) => {
  const { title, description, Image, user } = req.body;
  const blog = new Blog({
    title,
    description,
    Image,
    user,
  });
  try {
    await blog.save();
    return res.status(200).json({ blog });
  } catch (err) {
    return res.status(500).json({ message: "error" });
  }
};

export const updateblog = async (req, res, next) => {
  const { title, description } = req.body;
  const blogId = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title,
      description,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to update the blog" });
  }
  return res.status(200).json({ blog });
};
