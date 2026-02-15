export default function Card({ title, children ,className="font-semibold",}) {
  return (
    <div className={`p-6 rounded-xl ${title==="Pricing" ? "-mt-6":""} ${title==="Inventory" ? "-mt-6":""} ${title==="Categories" ? "-mt-6":""}`}>
      {title && (
        <h2 className={`text-[22px]  text-[#23272E] mb-6 ${className}`}>{title}</h2>
      )}
      {children}
    </div>
  );
}
