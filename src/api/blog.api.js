import API from "./axiosInstance";


// CREATE BLOG
export const createBlog = async (data) => {
  try {
    const res = await API.post("/blogs", data);
    return res.data;
  } catch (error) {
    console.error("Create Blog Error:", error);
    throw error;
  }
};


// GET ALL BLOGS
export const getAllBlogs = async () => {
  try {
    const res = await API.get("/blogs");
    return res.data;
  } catch (error) {
    console.error("Fetch Blogs Error:", error);
    throw error;
  }
};


// GET BLOG BY ID
export const getBlogById = async (id) => {
  try {
    const res = await API.get(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Fetch Blog Error:", error);
    throw error;
  }
};


// UPDATE BLOG
export const updateBlog = async (id, data) => {
  try {
    const res = await API.put(`/blogs/${id}`, data);
    return res.data;
  } catch (error) {
    console.error("Update Blog Error:", error);
    throw error;
  }
};


// DELETE BLOG
export const deleteBlog = async (id) => {
  try {
    const res = await API.delete(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete Blog Error:", error);
    throw error;
  }
};


// UPLOAD BLOG IMAGE
export const uploadBlogImage = async (file) => {
  try {
    const formData = new FormData();

    // field name must match backend
    formData.append("image", file);

    const res = await API.post("/blogs/image/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    console.error("Image Upload Error:", error.response?.data || error);
    throw error;
  }
};