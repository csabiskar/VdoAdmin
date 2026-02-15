export default function Input({ label, className = "", type = "text", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-[15px] text-[#023337] font-normal">
          {label}
        </label>
      )}

      <input
        type={type}
        className="w-full border rounded-lg px-3 border-[#E5E7EB] bg-[#F9FAFB] h-12 focus:outline-none focus:border-[#00B207] transition placeholder:text-black placeholder:text-sm placeholder:font-light mt-2.5"
        {...props}
      />
    </div>
  );
}
