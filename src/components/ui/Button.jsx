export default function Button({ children, variant = "primary" }) {
  const base = "p-3 rounded-lg font-medium transition cursor-pointer";

  const styles = {
    primary: "bg-[#00B207] text-[15px] text-white hover:bg-green-700",
    outline: "border border-[#00B207] text-[15px] text-green-600 hover:bg-green-50",
  };

  return <button className={`${base} ${styles[variant]}`}>{children}</button>;
}
