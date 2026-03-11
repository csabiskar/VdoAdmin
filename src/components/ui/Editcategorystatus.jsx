import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Button from "./Button";

const initialCategories = [
  { id: 1, name: "Noodles", active: false },
  { id: 2, name: "Sevai (Vermicelli)", active: true },
  { id: 3, name: "Healthy Snacks", active: true },
  { id: 4, name: "Cold Pressed Edible Oil", active: true },
  { id: 5, name: "Herbal Hair Oil", active: true },
  { id: 6, name: "Pasta", active: true },
  { id: 7, name: "Instant Pongal Mix", active: false },
];

export default function EditCategoryStatus({ onCancel, onSave }) {
  const [categories, setCategories] = useState(initialCategories);

  const toggleStatus = (id) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat))
    );
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Edit category:", id);
  };

  const handleSave = () => {
    onSave?.(categories);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">

        {/* Title */}
        <h2 className="text-[22px] font-semibold text-gray-900 mb-6">
          Edit Category Status
        </h2>

        {/* Category rows */}
        <div className="flex flex-col gap-3 mb-8 max-h-105 overflow-y-auto pr-1">
          {categories.map((cat) => (
            <div key={cat.id} className="flex items-center gap-3">

              {/* Row box: name + toggle */}
              <div className="flex items-center justify-between flex-1 border border-gray-200 rounded-lg px-4 py-3">
                <span className="text-sm text-gray-800 font-medium">
                  {cat.name}
                </span>

                {/* Toggle */}
                <button
                  onClick={() => toggleStatus(cat.id)}
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none shrink-0 ${
                    cat.active ? "bg-[#00B207]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.75 left-0.75 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                      cat.active ? "translate-x-7" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {/* Edit button — outside the row box */}
              <button
                onClick={() => handleEdit(cat.id)}
                className="w-11 h-11 shrink-0 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-gray-50 transition cursor-pointer"
              >
                <FaRegEdit size={17} className="text-gray-400" />
              </button>

              {/* Delete button — outside the row box */}
              <button
                onClick={() => handleDelete(cat.id)}
                className="w-11 h-11 shrink-0 flex items-center justify-center border border-gray-200 rounded-lg hover:bg-red-50 transition cursor-pointer"
              >
                <RiDeleteBinLine size={17} className="text-gray-400" />
              </button>

            </div>
          ))}
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button variant="primary" onClick={handleSave}>Save</Button>
        </div>

      </div>
    </div>
  );
}