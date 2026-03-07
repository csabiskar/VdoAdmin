import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import Img from "../../assets/blog.png";
import editIcon from '../../assets/Dashboradicons/edit.svg';
import deleteIcon from '../../assets/Dashboradicons/delete.svg';
import { useNavigate } from "react-router-dom";
import DeleteModal from "../../components/ui/DeleteModal"; // adjust path if needed

const SEED_BLOGS = [
  { id: "seed-1", title: "Millet - The Super Food", time: "5 min", author: "Admin", status: "draft",     publishedOn: "03 Jan 2030", image: null },
  { id: "seed-2", title: "Millet - The Super Food", time: "5 min", author: "Admin", status: "Published", publishedOn: "03 Jan 2030", image: null },
  { id: "seed-3", title: "Millet - The Super Food", time: "5 min", author: "Admin", status: "Published", publishedOn: "03 Jan 2030", image: null },
  { id: "seed-4", title: "Millet - The Super Food", time: "5 min", author: "Admin", status: "draft",     publishedOn: "03 Jan 2030", image: null },
  { id: "seed-5", title: "Millet - The Super Food", time: "5 min", author: "Admin", status: "Published", publishedOn: "03 Jan 2030", image: null },
];

function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [deleteTargetId, setDeleteTargetId] = useState(null); // null = modal closed

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("blogs") || "[]");
    setBlogs([...SEED_BLOGS, ...saved]);
  }, []);

  // Opens the confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteTargetId(id);
  };

  // Confirmed — actually delete
  const handleConfirmDelete = () => {
    const saved = JSON.parse(localStorage.getItem("blogs") || "[]");
    const updated = saved.filter((b) => b.id !== deleteTargetId);
    localStorage.setItem("blogs", JSON.stringify(updated));
    setBlogs((prev) => prev.filter((b) => b.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  // Cancelled — close modal
  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const handleEdit = (id) => {
    navigate(`/blogs/edit/${id}`);
  };

  return (
    <div className="w-full">
      {/* Delete Confirmation Modal */}
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
                  <tr key={item.id} className="border-t border-gray-300 hover:bg-gray-50 transition">
                    <td className="px-4 sm:px-6 py-4 flex gap-2 items-center border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                      <img src={item.image || Img} className="w-8 h-8 rounded object-cover" alt="" />
                      {item.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px]">{item.time}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">{item.author}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300">
                      <span className={`inline-block px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg text-[#1E1E1E] text-xs sm:text-[12px] whitespace-nowrap ${item.status === "draft" ? "bg-[#FBE7E9]" : "bg-[#00B20733]"}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">{item.publishedOn}</td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex justify-center items-center gap-3 sm:gap-4">
                        <img
                          src={editIcon}
                          className="cursor-pointer hover:opacity-70 transition"
                          title="Edit"
                          onClick={() => handleEdit(item.id)}
                        />
                        <img
                          src={deleteIcon}
                          className="cursor-pointer hover:opacity-70 transition"
                          title="Delete"
                          onClick={() => handleDeleteClick(item.id)}
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