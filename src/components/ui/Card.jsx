export default function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      {title && (
        <h2 className="text-lg font-semibold mb-6">{title}</h2>
      )}
      {children}
    </div>
  );
}
