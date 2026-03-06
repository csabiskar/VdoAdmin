import React from "react";
import Button from "../../components/ui/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import Img from "../../assets/blog.png";
import editIcon from '../../assets/Dashboradicons/edit.svg'
import deleteIcon from '../../assets/Dashboradicons/delete.svg'

function Blogs() {
  const deals = [
    {
      title: "Millet - The Super Food",
      time: "5 min",
      author: "Admin",
      status: "draft",
      publishedOn: "03 Jan 2030",
      image: Img,
    },
    {
      title: "Millet - The Super Food",
      time: "5 min",
      author: "Admin",
      status: "Published",
      publishedOn: "03 Jan 2030",
      image: Img,
    },
    {
      title: "Millet - The Super Food",
      time: "5 min",
      author: "Admin",
      status: "Published",
      publishedOn: "03 Jan 2030",
      image: Img,
    },
    {
      title: "Millet - The Super Food",
      time: "5 min",
      author: "Admin",
      status: "draft",
      publishedOn: "03 Jan 2030",
      image: Img,
    },
    {
      title: "Millet - The Super Food",
      time: "5 min",
      author: "Admin",
      status: "Published",
      publishedOn: "03 Jan 2030",
      image: Img,
    },
  ];
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
        <h1 className="text-[22px] font-semibold text-[#023337] ">Blogs</h1>

        <div className="flex gap-6">
          <Button>Create New Blog</Button>
        </div>
      </div>
      <div className="mt-16.25">
        <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* HEADER */}
              <thead className="bg-[#EAF8E7]">
                <tr>
                  <th className="px-4 sm:px-6 w-72.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                    Blog Title
                  </th>
                  <th className="px-4 sm:px-6 w-48.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                    Reading Time
                  </th>
                  <th className="px-4 sm:px-6 h-16.25 w-16 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                    Author
                  </th>
                  <th className="px-4 sm:px-6 h-16.25 w-37.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 sm:px-6 h-16.25 w-46.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                    Published on
                  </th>
                  <th className="px-4 sm:px-6 h-16.25 w-39.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] text-center whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody className="text-gray-800">
                {deals.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-300 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 sm:px-6 py-4 flex gap-2 items-center  border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                      <img src={item.image} className="w-8 h-8" alt="" />{" "}
                      {item.title}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300  text-sm sm:text-[14px]">
                      {item.time}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                      {item.author}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300">
                      <span
                        className={`inline-block px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg  text-[#1E1E1E] text-xs sm:text-[12px]  whitespace-nowrap ${item.status === "draft" ? "bg-[#FBE7E9]" : "bg-[#00B20733]"}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                      {item.publishedOn}
                    </td>
                    <td className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="flex justify-center items-center gap-3 sm:gap-4">
                        <img
                        src={editIcon}
                          className="text-lg sm:text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition"
                          title="Edit"
                        />
                        <img
                        src={deleteIcon}
                          className="text-lg sm:text-xl text-gray-600 cursor-pointer hover:text-red-600 transition"
                          title="Delete"
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
