import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate, Navigate } from "react-router-dom";
import OTPInput from "./OTPInput"
import { detectContactType } from "../utils/auth"
import { sendOTP, verifyOTP } from "../api/auth.api";
import { useAuth } from "../context/authContext";
import { BiSolidError } from "react-icons/bi";
// import { showToast } from "../../utils/toast";




export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { login, isAuth, loading: authLoading } = useAuth(); // ✅ use context
  const isLogin = location.pathname === "/login";

  const [step, setStep] = useState("input");
  const [contact, setContact] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ✅ reset when switching login/signup */
  useEffect(() => {
    setStep("input");
    setContact("");
    setOtp("");
    setError("");
    setTimer(30);
  }, [location.pathname]);

  /* ✅ OTP countdown */
  useEffect(() => {
    if (step !== "otp" || timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!authLoading && isAuth) {
    return <Navigate to="/" replace />;
  }
  /* ---------- GET OTP ---------- */
  const handleGetOtp = async (e) => {
    e.preventDefault();

    const detected = detectContactType(contact);
    console.log(detected,isLogin)
    if (!detected) {
      setError("Please enter a valid email or phone number");
      return;
    }
    try {
      setLoading(true);
      setError("");
      await sendOTP(contact); // API
    //  showToast("An OTP has been sent to your number/email", "info");
      setStep("otp");
      setTimer(30);
    } catch (err) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    if (timer <= 0) {
      setError("OTP expired. Please resend to get a new OTP.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await verifyOTP({
        contact,
        otp,
      });
    // showToast("Login successful!", "success");
      login(res.token,contact); // ✅ context handles localStorage
      navigate("/", { replace: true });
    } catch (err) {
      setError( "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- RESEND ---------- */
  const handleResendOtp = async () => {
    try {
      setTimer(30);
      setOtp("");
      await sendOTP(contact);
      // showToast("A new OTP has been sent", "info");
    } catch {
      setError("Failed to resend OTP");
    }
  };

  /* ---------- CHANGE CONTACT ---------- */
  const handleChangeContact = () => {
    setStep("input");
    setOtp("");
    setError("");
  };

  return (
    <main className="flex-1 -mt-4  flex items-center justify-center px-4 sm:px-6 pt-24 pb-36 min-h-screen">
      <section
        aria-labelledby="auth-title"
        className="
          w-full max-w-90 sm:max-w-105 md:max-w-130
          bg-white border border-[#F2F2F2] rounded-lg
          shadow-[0_6px_20px_rgba(0,0,0,0.08)]
          px-5 sm:px-6 py-20
        "
      >
        <h1 className="text-center text-[32px] font-semibold -mt-2.5 mb-9">
          {isLogin ? "Log In" : "Create Account"}
        </h1>

        {step === "input" && (
          <form onSubmit={handleGetOtp} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your Phone Number/Email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="h-12 px-4 border border-[#E6E6E6] rounded-md"
              required
            />

            {error && (
            <p className="text-sm text-red-500 text-start flex justify-start items-start gap-1 px-1 "> <BiSolidError size={16}/> {error}</p>
            )}

            <button
              disabled={loading}
              className="mt-2.5 w-full h-12 bg-[#00B207] text-white rounded-md font-medium text-sm"
            >
              {loading ? "Please wait..." : "Get OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="flex flex-col gap-6">
            <OTPInput value={otp} onChange={setOtp} autoFocus />

            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            <button
              disabled={loading}
              className="w-full h-12 bg-[#00B207] text-white rounded-md font-medium text-sm"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="flex justify-between text-sm">
              {timer > 0 ? (
                <span className="text-gray-400">Resend OTP in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-[#00B207] font-medium cursor-pointer"
                >
                  Resend OTP
                </button>
              )}

              <button
                type="button"
                onClick={handleChangeContact}
                className="underline text-gray-600 cursor-pointer"
              >
                Change number/email
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[#666666]">
          {isLogin ? (
            <>
              Don’t have account?{" "}
              <Link to="/signup" className="font-medium text-black">
                Register
              </Link>
            </>
          ) : (
            <>
              Already have account?{" "}
              <Link to="/login" className="font-medium text-black">
                Login
              </Link>
            </>
          )}
        </p>
      </section>
    </main>
  );
}
