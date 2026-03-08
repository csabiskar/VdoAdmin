import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import { MdOutlineRefresh } from "react-icons/md";
import Button from "./Button";

const CARD_TYPES = ["Card 1", "Card 2", "Card 3", "Card 4"];

export default function DealEditModal({ deal, onClose, onSave }) {
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    productName: deal?.product || "",
    cardType: deal?.priceTag || "Card 1",
    productPrice: deal?.actual ? deal.actual.replace("₹", "") : "",
    discountedPrice: deal?.discount ? deal.discount.replace("₹", "") : "",
    productCategory: "",
    productWeight: "",
    image: null,
    imagePreview: null,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, image: file, imagePreview: url }));
  };

  const handleSave = () => {
    onSave?.(form);
    onClose();
  };

  // compute discount percentage & sale price for display
  const price = parseFloat(form.productPrice) || 0;
  const discounted = parseFloat(form.discountedPrice) || 0;
  const discountPct =
    price > 0 && discounted > 0 && discounted < price
      ? Math.round(((price - discounted) / price) * 100)
      : null;
  const salePrice = discounted > 0 ? discounted.toFixed(2) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 pr-[35px]">
      <div className="bg-white rounded-[10px] shadow-2xl w-full max-w-[1110px] min-h-[827px] pt-[90px] pl-[46px] pr-[46px] pb-[113px] relative">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-[90px] right-[46px] w-[24px] h-[24px] flex items-center justify-center hover:opacity-70 transition cursor-pointer"
        >
          <IoClose size={24} className="text-[#1C1B1F]" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {/* LEFT: Basic Details + Card Type */}
          <div className="flex flex-col gap-6">
            {/* Section: Basic Details */}
            <div>
              <h3 className="text-[22px] font-semibold text-[#23272E] leading-[26px] mb-4">
                Basic Details
              </h3>

              {/* Product Name */}
              <label className="block text-[15px] font-normal text-[#023337] mb-[12px]">
                Product Name
              </label>
              <input
                type="text"
                placeholder="Enter name"
                value={form.productName}
                onChange={(e) => handleChange("productName", e.target.value)}
                className="w-full h-[48px] border border-[#E5E7EB] rounded-[8px] px-[12px] py-[10px] bg-[#F9FAFB] text-[15px] text-[#023337] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B207]/40"
              />
            </div>

            {/* Select Card Type */}
            <div className="flex flex-col gap-[12px]">
              <h3 className="text-[22px] font-semibold text-[#23272E] leading-[26px]">
                Select Card Type
              </h3>
              <div className="flex flex-col gap-[12px]">
                {CARD_TYPES.map((card) => (
                  <label
                    key={card}
                    className="flex items-center gap-[12px] cursor-pointer text-[18px] font-normal text-[#023337]"
                    onClick={() => handleChange("cardType", card)}
                  >
                    {/* Custom radio circle */}
                    {form.cardType === card ? (
                      /* Selected — green filled ring + white dot */
                      <span className="w-[24px] h-[24px] rounded-full bg-[#00B207] border-[3px] border-[#00B207] flex items-center justify-center flex-shrink-0">
                        <span className="w-[8px] h-[8px] rounded-full bg-white" />
                      </span>
                    ) : (
                      /* Unselected — gray ring */
                      <span className="w-[24px] h-[24px] rounded-full border-[2px] border-[#D9D9D9] bg-white flex-shrink-0" />
                    )}
                    {card}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Upload Product Image */}
          <div>
            <h3 className="text-[22px] font-medium text-[#23272E] leading-[26px] mb-4">
              Upload Product Image
            </h3>
            <label className="block text-[15px] font-normal text-[#023337] mb-[12px]">
              Product Image
            </label>

            {/* Image preview box with Browse/Replace inside */}
            <div className="relative border border-[#E5E7EB] rounded-[8px] w-full h-[266px] bg-white overflow-hidden flex items-center justify-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt="preview"
                  className="h-full w-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-400 gap-2">
                  <FiUpload size={28} />
                  <span className="text-xs">No image selected</span>
                </div>
              )}

              {/* Browse / Replace — bottom of image box */}
              <div className="absolute bottom-[12px] left-[12px] right-[12px] flex items-center justify-between">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-[4px] h-[36px] px-[12px] py-[8px] border border-[#E5E7EB] rounded-[8px] bg-white text-[14px] font-normal text-[#6A717F] hover:bg-gray-50 transition cursor-pointer"
                >
                  {/* material-symbols:image-rounded 15×15, fill #6A717F */}
                  <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.66667 15C1.20833 15 0.816111 14.8369 0.491667 14.5108C0.167222 14.1847 0.00444444 13.7917 0 13.3333V1.66667C0 1.20833 0.163111 0.816111 0.489333 0.491667C0.815556 0.167222 1.20833 0.00444444 1.66667 0H13.3333C13.7917 0 14.1842 0.163111 14.5108 0.489333C14.8375 0.815556 15.0003 1.20833 15 1.66667V13.3333C15 13.7917 14.8369 14.1842 14.5108 14.5108C14.1847 14.8375 13.7917 15.0003 13.3333 15H1.66667ZM1.66667 13.3333H13.3333V1.66667H1.66667V13.3333ZM2.5 11.6667H12.5L9.375 7.5L7.08333 10.4167L5.41667 8.33333L2.5 11.6667Z" fill="#6A717F"/>
                  </svg>
                  Browse
                </button>
                <button
                  onClick={() =>
                    setForm((prev) => ({ ...prev, image: null, imagePreview: null }))
                  }
                  className="inline-flex items-center gap-[4px] h-[36px] px-[12px] py-[8px] border border-[#E5E7EB] rounded-[8px] bg-white text-[14px] font-normal text-[#6A717F] hover:bg-gray-50 transition cursor-pointer"
                >
                  <MdOutlineRefresh size={15} />
                  Replace
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: Pricing + Categories (aligned) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-6">
          {/* LEFT: Pricing */}
          <div className="flex flex-col">
            <h3 className="text-[22px] font-semibold text-[#23272E] leading-[26px] mb-[19px]">
              Pricing
            </h3>

            {/* Product Price */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[15px] font-normal text-[#023337]">
                Product Price
              </label>
              <input
                type="number"
                placeholder="₹1000.00"
                value={form.productPrice}
                onChange={(e) => handleChange("productPrice", e.target.value)}
                className="w-full h-[48px] border border-[#E5E7EB] rounded-[8px] px-[12px] py-[10px] bg-[#F9FAFB] text-[15px] text-[#023337] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B207]/40"
              />
            </div>

            <div className="h-[19px]" />

            {/* Discounted Price */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[15px] font-normal text-[#023337]">
                Discounted Price{" "}
                <span className="text-gray-400 font-normal">(Optional)</span>
              </label>

              {/* Computed discount display row */}
              <div className="w-full h-[48px] flex items-center justify-between border border-[#E5E7EB] rounded-[8px] px-[12px] bg-[#F9FAFB]">
                {discountPct !== null ? (
                  <span className="h-[32px] px-[10px] inline-flex items-center justify-center rounded-[4px] bg-[#E9F9E6] text-[15px] font-bold text-[#000]">
                    {discountPct}% Off
                  </span>
                ) : (
                  <span className="text-[15px] text-gray-400">—</span>
                )}
                {salePrice !== null && (
                  <span className="text-[15px] font-medium text-[#023337]">
                    Sale= ₹{salePrice}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: Categories */}
          <div className="flex flex-col">
            <h3 className="text-[22px] font-medium text-[#23272E] leading-[26px] mb-[19px]">
              Categories
            </h3>

            {/* Product Categories */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[15px] font-normal text-[#023337]">
                Product Categories
              </label>
              {/* Custom select wrapper */}
              <div className="relative w-full">
                <select
                  value={form.productCategory}
                  onChange={(e) => handleChange("productCategory", e.target.value)}
                  className="w-full h-[48px] appearance-none border border-[#E5E7EB] rounded-[8px] px-[12px] bg-[#F9FAFB] text-[15px] text-[#023337] focus:outline-none focus:ring-2 focus:ring-[#00B207]/40 cursor-pointer pr-[40px]"
                >
                  <option value="">Select your product</option>
                  <option value="noodles">Noodles</option>
                  <option value="snacks">Healthy Snacks</option>
                  <option value="oil">Cold Pressed Edible Oil</option>
                  <option value="hair-oil">Herbal Hair Oil</option>
                  <option value="pasta">Pasta</option>
                </select>
                {/* Custom dropdown arrow */}
                <span className="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 10L12 15L17 10H7Z" fill="black"/>
                  </svg>
                </span>
              </div>
            </div>

            <div className="h-[19px]" />

            {/* Product Weight */}
            <div className="flex flex-col gap-[12px]">
              <label className="text-[15px] font-normal text-[#023337]">
                Product Weight
              </label>
              <input
                type="text"
                placeholder="Enter Product weight, Ex: 750gm"
                value={form.productWeight}
                onChange={(e) => handleChange("productWeight", e.target.value)}
                className="w-full h-[48px] border border-[#E5E7EB] rounded-[8px] px-[12px] bg-[#F9FAFB] text-[15px] text-[#023337] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00B207]/40"
              />
            </div>
          </div>
        </div>

        {/* Save button — aligned to right column, starts at 233px offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mt-8">
          <div></div>
          <div className="flex">
            <div className="w-[233px] flex-shrink-0"></div>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#00B207] text-white text-[15px] font-semibold rounded-lg hover:bg-green-700 transition cursor-pointer py-[6px] tracking-[-0.3px] h-[44.5px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
