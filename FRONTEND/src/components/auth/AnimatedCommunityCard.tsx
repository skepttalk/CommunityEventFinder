import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function AnimatedCommunityCard() {
  return (
    <Card className="overflow-hidden relative h-44 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)",
        }}
      />

      <CardContent className="flex items-center justify-center h-full relative overflow-hidden">
        <motion.div
          className="absolute whitespace-nowrap text-lg font-semibold"
          animate={{ x: ["100%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 14,
            ease: "linear",
          }}
        >
          Connecting neighbors, one event at a time • Connecting neighbors, one
          event at a time • Connecting neighbors, one event at a time
        </motion.div>
      </CardContent>
    </Card>
  );
}
