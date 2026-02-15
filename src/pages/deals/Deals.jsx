import React from "react";
import Button from "../../components/ui/Button";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";



function Deals() {
  const deals = [
    {
      product: "Dia Caare Millet 70gm",
      priceTag: "Card - Large",
      actual: "₹70.00",
      discount: "₹42.00",
    },
    {
      product: "Little Pasta",
      priceTag: "Card 1",
      actual: "₹40.00",
      discount: "₹26.00",
    },
    {
      product: "Saamai Noodles",
      priceTag: "Card 2",
      actual: "₹70.00",
      discount: "₹42.00",
    },
    {
      product: "Herbal Hair Oils",
      priceTag: "Card 3",
      actual: "₹160.00",
      discount: "₹128.00",
    },
    {
      product: "Moringa Millet Noodles",
      priceTag: "Card 4",
      actual: "₹70.00",
      discount: "₹42.00",
    },
    {
      product: "Children's Choice Millet Cookies",
      priceTag: "Card 5",
      actual: "₹70.00",
      discount: "₹42.00",
    },
  ];
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
          <h1 className="text-[22px] font-semibold text-[#023337] ">Deals</h1>

          <div className="flex gap-6">
            <Button>Create New Deals</Button>
          </div>
        </div>
       <div className="mt-16.25">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* HEADER */}
            <thead className="bg-[#EAF8E7]">
              <tr>
                <th className="px-4 sm:px-6 w-48.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                  Deal name
                </th>
                <th className="px-4 sm:px-6 w-48.5 h-16.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                  Product
                </th>
                <th className="px-4 sm:px-6 h-16.25 w-33 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                  Discount
                </th>
                <th className="px-4 sm:px-6 h-16.25 w-37.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                  Price
                </th>
                <th className="px-4 sm:px-6 h-16.25 w-29.5 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-gray-300 whitespace-nowrap">
                  Actual Price
                </th>
                <th className="px-4 sm:px-6 h-16.25 w-50.25 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] border-r border-[#EAF8E7] whitespace-nowrap">
                  Discounted Price
                </th>
                <th className="px-4 sm:px-6 h-16.25 w-23.75 font-medium text-sm sm:text-[17.38px] text-[#1E1E1E] text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-gray-800">
              {deals.map((item, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-gray-50 transition">
                  <td className="px-4 sm:px-6 py-4  border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                    Hot Deals
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300  text-sm sm:text-[14px]">
                    {item.product}
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                    20% Off
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300">
                    <span className="inline-block px-3 sm:px-2 py-1.5 sm:py-1 rounded-lg bg-[#FBE7E9] text-[#1E1E1E] text-xs sm:text-[12px]  whitespace-nowrap">
                      {item.priceTag}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300 text-sm sm:text-[14px] whitespace-nowrap">
                    {item.actual}
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5 border-r border-gray-300  text-sm sm:text-[14px] whitespace-nowrap">
                    {item.discount}
                  </td>
                  <td className="px-4 sm:px-6 py-4 sm:py-5">
                    <div className="flex justify-center items-center gap-3 sm:gap-4">
                      <FaRegEdit 
                        className="text-lg sm:text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition" 
                        title="Edit"
                      />
                      <RiDeleteBin6Line 
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
    </>
  );
}

export default Deals;
