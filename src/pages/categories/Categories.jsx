import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { CiSearch } from "react-icons/ci";
import Img from "../../assets/product.png";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";

const data = [
  "Noodles",
  "Sevai",
  "Ladduuu",
  "Healthy Snacks",
  "Maavuuurandi",
  "oil",
];

const categoryData = [
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
  {
    product: "Kambu Noodles (Pearl Millet)",
    CreatedDate: "01-01-2025",
    order: 25,
    image: Img,
  },
];
function Categories() {
  const [activeCategory, setActiveCategory] = useState("");
  return (
    <>
      <div className="w-full min-h-screen">
        {/* header */}
        <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
          <h1 className="text-[22px] font-semibold text-[#023337] ">Deals</h1>

          <div className="flex gap-6">
            <Button variant="outline">Edit Category</Button>
            <Button>Add New Category</Button>
          </div>
        </div>

        {/* category */}

        <div className="flex flex-wrap gap-5 ">
          {data.map((value, index) => (
            <div
              key={index}
              className="border rounded-sm border-black/20 w-62.5 h-12.5 flex gap-2 px-12 items-center"
              onClick={() => setActiveCategory(value)}
            >
              <span
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  activeCategory === value
                    ? "border-[#00B207]"
                    : "border-gray-300"
                }`}
              >
                {activeCategory === value && (
                  <span className="w-3 h-3 bg-[#00B207] rounded-full" />
                )}
              </span>{" "}
              {value}
            </div>
          ))}
        </div>

        {/* category table */}
        <div className="bg-[#F9FAFB] rounded-md border border-gray-300 shadow-sm mb-16 mt-12">
          {/* search */}
          <div className="flex justify-end items-center h-24.5 pr-12 relative">
            <input
              type="text"
              placeholder="search your product"
              className="w-66 h-9 rounded-lg border px-2 border-[#E5E7EB] bg-[#F9FAFB]  focus:outline-none focus:border-[#00B207] transition placeholder:text-black placeholder:text-sm placeholder:font-light "
            />
            <CiSearch size={22} className="absolute right-14" />
          </div>
          {/* table  */}
          <div className="overflow-x-auto">
            <table className="border-collapse w-full text-left">
              <thead className="bg-[#EAF8E7] ">
                <tr>
                  <th className="px-4 sm:px-6 w-16 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    No
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Product
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Created Date
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Order
                  </th>
                  <th className="px-4 sm:px-6 w-60.75 h-16 font-medium text-sm sm:text-[15px] text-[#1E1E1E] whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {categoryData.map((value, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-300 hover:bg-gray-50 transition "
                  >
                    <td className="px-4 sm:px-6 py-6 text-sm sm:text-[14px] whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap flex gap-1 items-center justify-center">
                      <img
                        src={value.image}
                        className="object-cover w-10 h-10  border rounded-sm border-[#E5E7EB]"
                        alt=""
                      />{" "}
                      {value.product}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap">
                      {value.CreatedDate}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap">
                      {value.order}
                    </td>
                    <td className="px-4 sm:px-6 py-4 text-sm sm:text-[14px] whitespace-nowrap flex gap-1">
                      <FaRegEdit
                        size={22}
                        className="text-[#6A717F] cursor-pointer"
                      />
                      <RiDeleteBinLine
                        size={22}
                        className="text-[#6A717F] cursor-pointer"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Categories;
