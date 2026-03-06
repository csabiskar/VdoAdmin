import { RiDeleteBinLine } from "react-icons/ri";

export default function DeleteModal({ onCancel, onDelete }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs mx-4 p-8 flex flex-col items-center text-center">

        {/* Icon */}
        <div className="w-16 h-16  bg-red-50 flex items-center justify-center mb-4">
          <RiDeleteBinLine size={28} className="text-red-500" />
        </div>

        {/* Message */}
        <h2 className="text-[18px] font-semibold text-gray-900 mb-8">
          Are you sure you want to Delete?
        </h2>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-center">
          <button
            onClick={onCancel}
            className="px-6 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onDelete}
            className="px-6 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition cursor-pointer"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}