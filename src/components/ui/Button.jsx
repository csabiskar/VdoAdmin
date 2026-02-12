export default function Button({ children, variant = "primary" }) {
  const base = "px-5 py-2 rounded-lg font-medium transition";

  const styles = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    outline: "border border-green-600 text-green-600 hover:bg-green-50",
  };

  return <button className={`${base} ${styles[variant]}`}>{children}</button>;
}
