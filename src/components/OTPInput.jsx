import { useRef, useEffect } from "react";

export default function OTPInput({ value, onChange, autoFocus }) {
  const inputsRef = useRef([]);

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const handleChange = (e, i) => {
    const digit = e.target.value.replace(/\D/g, "");
    const otpArr = value.split("");

    otpArr[i] = digit;
    onChange(otpArr.join(""));

    if (digit && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (e, i) => {
    if (e.key === "Backspace") {
      const otpArr = value.split("");
      otpArr[i] = "";
      onChange(otpArr.join(""));
      if (i > 0) inputsRef.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength="1"
          value={value[i] || ""}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="h-12 w-12 border rounded-md text-center"
        />
      ))}
    </div>
  );
}
