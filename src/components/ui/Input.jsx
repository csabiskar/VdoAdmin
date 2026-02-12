export default function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-600">{label}</label>
      )}
      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
        {...props}
      />
    </div>
  );
}
