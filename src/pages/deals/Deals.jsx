import React, { useState } from "react";
import Button from "../../components/ui/Button";
import { RiDeleteBin6Line } from "react-icons/ri";
import editIcon from '../../assets/Dashboradicons/edit.svg'
import deleteIcon from '../../assets/Dashboradicons/delete.svg'
import DealEditModal from "../../components/ui/DealEditModal";



function Deals() {
  const [editingDeal, setEditingDeal] = useState(null);
  const [creatingDeal, setCreatingDeal] = useState(false);
  const [activeTab, setActiveTab] = useState("hot");

  const pillColors = {
    "Card - Large": "#FBE7E9",
    "Card 1":       "#E8E5F4",
    "Card 2":       "#E8E5F4",
    "Card 3":       "#E8E5F4",
    "Card 4":       "#E8E5F4",
    "Card 5":       "#E8E5F4",
    "Card 6":       "#E8E5F4",
  };
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
      <div className="w-full pl-[20px]">
        <div className="flex justify-between items-center mb-8 max-w-300 mx-auto">
          <h1 className="text-[22px] font-semibold text-[#023337] ">Deals</h1>

          {/* Segmented Control */}
          <div
            className="flex items-center p-[2px] rounded-[8.91px] w-[343px] h-[32px] bg-[rgba(179,179,179,0.5)]"
          >
            {/* Hot deals tab */}
            <button
              onClick={() => setActiveTab('hot')}
              className={`flex-1 h-full flex items-center justify-center cursor-pointer transition rounded-[6.93px] text-[15px] font-semibold tracking-[-0.24px] leading-[20px] ${activeTab === 'hot' ? 'bg-white text-black [border:0.5px_solid_rgba(0,0,0,0.04)]' : 'bg-transparent text-white border-none'}`}
            >
              Hot deals
            </button>
            {/* Featured Products tab */}
            <button
              onClick={() => setActiveTab('featured')}
              className={`flex-1 h-full flex items-center justify-center cursor-pointer transition rounded-[6.93px] text-[15px] font-semibold tracking-[-0.24px] leading-[20px] ${activeTab === 'featured' ? 'bg-white text-black [border:0.5px_solid_rgba(0,0,0,0.04)]' : 'bg-transparent text-white border-none'}`}
            >
              Featured Products
            </button>
          </div>

          <div className="flex gap-[60px] items-center">
            <Button onClick={() => setCreatingDeal(true)}>Create New Deals</Button>
          </div>
        </div>
       <div className="mt-16.25">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-300 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* HEADER */}
            <thead className="bg-[#EAF8E7] [&_th]:font-medium text-[17.375px] text-[#222]">
              <tr>
                <th className="pl-[19.11px] py-[19.11px] w-48.5 whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                  Deal name
                </th>
                <th className="pl-[19.11px] py-[19.11px] w-48.5 whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                  Product
                </th>
                <th className="pl-[19.11px] py-[19.11px] w-33 whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                  Discount
                </th>
                <th className="pl-[19.11px] py-[19.11px] w-37.5 whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                  Price
                </th>
                <th className="pl-[19.11px] py-[6.11px] w-29.5 max-w-[60px] [border-right:1.043px_solid_#DBDBDB]">
                  Actual Price
                </th>
                <th className="pl-[19.11px] py-[19.11px] w-50.25 whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                  Discounted Price
                </th>
                <th className="px-[19.11px] py-[19.11px] w-23.75 text-center whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="text-[14px] font-medium text-[#222]">
              {deals.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50 transition [border-top:1.39px_solid_#DBDBDB]">
                  <td className="px-[19.11px] py-[19.11px] whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                    Hot Deals
                  </td>
                  <td className="pl-[19.11px] pr-[45.75px] py-[19.11px] [border-right:1.043px_solid_#DBDBDB]">
                    {item.product}
                  </td>
                  <td className="px-[19.11px] py-[19.11px] whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                    20% Off
                  </td>
                  <td className="px-[19.11px] py-[19.11px] [border-right:1.043px_solid_#DBDBDB]">
                    <span
                      className="inline-block rounded-lg text-[12px] font-medium text-[#222] whitespace-nowrap px-[10.43px] py-[3.48px]"
                      style={{ background: pillColors[item.priceTag] || '#F3F4F6' }}
                    >
                      {item.priceTag}
                    </span>
                  </td>
                  <td className="px-[19.11px] py-[19.11px] whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                    {item.actual}
                  </td>
                  <td className="px-[19.11px] py-[19.11px] whitespace-nowrap [border-right:1.043px_solid_#DBDBDB]">
                    {item.discount}
                  </td>
                  <td className="px-[19.11px] py-[19.11px]">
                    <div className="flex justify-center items-center gap-3 sm:gap-4">
                      <img
                        src={editIcon}
                        className="text-lg sm:text-xl text-gray-600 cursor-pointer hover:text-blue-600 transition"
                        title="Edit"
                        onClick={() => setEditingDeal(item)}
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

      {/* Edit Modal */}
      {editingDeal && (
        <DealEditModal
          deal={editingDeal}
          onClose={() => setEditingDeal(null)}
          onSave={(updatedData) => {
            console.log("Saved deal data:", updatedData);
            setEditingDeal(null);
          }}
        />
      )}

      {/* Create New Deal Modal */}
      {creatingDeal && (
        <DealEditModal
          deal={null}
          onClose={() => setCreatingDeal(false)}
          onSave={(newData) => {
            console.log("New deal data:", newData);
            setCreatingDeal(false);
          }}
        />
      )}
    </>
  );
}

export default Deals;
