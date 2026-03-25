import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Img from "../../assets/blog.png";
import editIcon from '../../assets/Dashboradicons/edit.svg';
import deleteIcon from '../../assets/Dashboradicons/delete.svg';
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/ui/Deletemodal";
import { getAllBlogs, deleteBlog } from "../../api/blog.api";


function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getAllBlogs();
      setBlogs(res || []);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
      setBlogs([]);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteBlog(deleteTargetId);
      setBlogs((prev) => prev.filter((b) => b._id !== deleteTargetId));
      setDeleteTargetId(null);
    } catch (error) {
      console.error("Delete blog failed", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  return (
    <div className="w-full">
      {deleteTargetId !== null && (
        <DeleteModal
          onCancel={handleCancelDelete}
          onDelete={handleConfirmDelete}
        />
      )}

      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337]">Blogs</h1>
        <div className="flex gap-6">
          <Button onClick={() => navigate("/blogs/createblog")}>Create New Blog</Button>
        </div>
      </div>

      <div className="mt-16.25">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#EAF8E7]">
                <tr>
                  <th className="px-4 sm:px-6 w-72.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">Blog Title</th>
                  <th className="px-4 sm:px-6 w-48.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">Reading Time</th>
                  <th className="px-4 sm:px-6 h-16.25 w-16 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">Author</th>
                  <th className="px-4 sm:px-6 h-16.25 w-37.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">Status</th>
                  <th className="px-4 sm:px-6 h-16.25 w-46.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">Published on</th>
                  <th className="px-4 sm:px-6 h-16.25 w-39.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {blogs.map((item) => (
                  <tr key={item._id} className="border-t border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-4 sm:px-6 py-4 flex gap-2 items-center border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                      {/* ✅ FIX: thumbnail is images[0] */}
                      <img src={item.images?.[0] || Img} className="w-8 h-8 rounded object-cover" alt="" />
                      {item.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px]">{item?.readingTime || ""}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">{item.author}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300">
                      <span className={`inline-block px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg text-[#1E1E1E] text-xs sm:text-[12px] whitespace-nowrap ${item.status === "draft" ? "bg-[#FBE7E9]" : "bg-[#00B20733]"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex justify-center items-center gap-3 sm:gap-4">
                        <img
                          src={editIcon}
                          className="cursor-pointer hover:opacity-70 transition"
                          title="Edit"
                          onClick={() => handleEdit(item._id)}
                        />
                        <img
                          src={deleteIcon}
                          className="cursor-pointer hover:opacity-70 transition"
                          title="Delete"
                          onClick={() => handleDeleteClick(item._id)} // ✅ FIX: was item._idid (typo)
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogs;