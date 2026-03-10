import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { resetPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useLocation } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert("Password reset successful");
      navigate("/login");
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Invalid reset code");
    },
  });

  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleReset = () => {
    const code = otp.join("");

    if (code.length !== 6) {
      alert("Enter the full 6-digit code");
      return;
    }

    if (!password) {
      alert("Enter new password");
      return;
    }

    mutation.mutate({
      email,
      code,
      password,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="shadow-lg rounded-2xl w-[420px]">
          <CardContent className="p-6 text-center space-y-5">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center"
            >
              <ShieldCheck size={36} className="text-indigo-600" />
            </motion.div>

            <h3 className="text-lg font-semibold">Reset Password</h3>

            <p className="text-sm text-gray-500">
              Enter the verification code and your new password.
            </p>

            <div className="flex justify-center gap-2">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  value={digit}
                  maxLength={1}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  onChange={(e) => handleChange(e.target.value, i)}
                  className="w-11 h-11 text-center text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              ))}
            </div>

            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <Button
              onClick={handleReset}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              Reset Password
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
