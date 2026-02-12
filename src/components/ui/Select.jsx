export default function Select({ label, children }) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-gray-600">{label}</label>
      )}
      <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none">
        {children}
      </select>
    </div>
  );
}
