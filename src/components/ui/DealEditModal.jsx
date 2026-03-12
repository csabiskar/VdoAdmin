import React, { useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { IoMdImage } from "react-icons/io";
import { LuRefreshCw } from "react-icons/lu";
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
    e.target.value = "";
  };

  const handleReplace = () => {
    if (form.imagePreview) {
      URL.revokeObjectURL(form.imagePreview);
    }
    setForm((prev) => ({ ...prev, image: null, imagePreview: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
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
                  <IoMdImage size={28} />
                  <span className="text-xs">No image selected</span>
                </div>
              )}

              {/* Browse / Replace — bottom of image box */}
              <div className="absolute bottom-[12px] left-[12px] right-[12px] flex items-center justify-between">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer"
                >
                  <IoMdImage size={18} />
                  Browse
                </button>
                <button
                  onClick={handleReplace}
                  className="border border-[#E5E7EB] rounded-md h-9 text-[13px] text-[#6A717F] px-2 flex gap-1 justify-center items-center cursor-pointer"
                >
                  <LuRefreshCw size={16} />
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

              {/* Single row: % Off pill on left, "Sale= ₹" input on right */}
              <div className="w-full h-[48px] flex items-center justify-between border border-[#E5E7EB] rounded-[8px] px-[12px] bg-[#F9FAFB] focus-within:ring-2 focus-within:ring-[#00B207]/40">
                {discountPct !== null ? (
                  <span className="h-[32px] px-[10px] inline-flex items-center justify-center rounded-[4px] bg-[#E9F9E6] text-[15px] font-bold text-[#000] flex-shrink-0">
                    {discountPct}% Off
                  </span>
                ) : (
                  <span className="text-[15px] text-gray-400 flex-shrink-0">—</span>
                )}
                <div className="flex items-center gap-[4px]">
                  <span className="text-[15px] font-medium text-[#023337]">Sale= ₹</span>
                  <input
                    type="number"
                    placeholder="0.00"
                    value={form.discountedPrice}
                    onChange={(e) => handleChange("discountedPrice", e.target.value)}
                    className="w-[80px] bg-transparent text-[15px] font-medium text-[#023337] placeholder-gray-400 focus:outline-none text-right"
                  />
                </div>
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
