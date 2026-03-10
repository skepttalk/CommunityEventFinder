import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff, Users, Megaphone } from "lucide-react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/services/auth.service";

export default function RegisterForm({ setEmail, setShowOTP }: any) {
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setLocalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"participant" | "organizer">("participant");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      localStorage.setItem("verifyEmail", email);
      setEmail(email);
      setShowOTP(true);
    },
    onError: (err: any) => {
      alert(
        err?.response?.data?.message ||
          "Unable to create account. Please try again.",
      );
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    mutation.mutate({
      name,
      email,
      password,
      role,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="backdrop-blur-md bg-white/80 border shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
            <p className="text-gray-500 mt-1">
              Join your local community and discover amazing events happening
              near you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label>Full Name</Label>
              <div className="relative">
                <User
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  className="pl-10 h-11 rounded-xl bg-gray-50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                type="email"
                  className="pl-10 h-11 rounded-xl bg-gray-50"
                  value={email}
                  onChange={(e) => setLocalEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-3 text-gray-400"
                  size={18}
                />
                <Input
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 h-11 rounded-xl bg-gray-50"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <Label>I am a...</Label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setRole("participant")}
                  className={`flex items-center gap-2 px-4 py-3 border rounded-xl w-full transition
                  ${
                    role === "participant"
                      ? "border-indigo-500 bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >
                  <Users size={18} />
                  Attendee
                </button>

                <button
                  type="button"
                  onClick={() => setRole("organizer")}
                  className={`flex items-center gap-2 px-4 py-3 border rounded-xl w-full transition
                  ${
                    role === "organizer"
                      ? "border-indigo-500 bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >
                  <Megaphone size={18} />
                  Organizer
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base rounded-xl bg-indigo-600 hover:bg-indigo-700"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Creating..." : "Create Account"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
