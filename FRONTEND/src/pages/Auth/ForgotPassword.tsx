import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { forgotPassword } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: forgotPassword,
    onSuccess: () => {
      alert("Reset code sent to your email");
      navigate("/reset-password", { state: { email } });
    },
    onError: (err: any) => {
      alert(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    mutation.mutate(email);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="shadow-lg rounded-2xl w-[400px]">
          <CardContent className="p-6 text-center space-y-5">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center"
            >
              <Mail size={36} className="text-indigo-600" />
            </motion.div>

            <h3 className="text-lg font-semibold">Forgot Password</h3>

            <p className="text-sm text-gray-500">
              Enter your email and we'll send a reset code.
            </p>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-xl p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
            />

            <Button
              onClick={handleSubmit}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-700"
            >
              Send Reset Code
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
