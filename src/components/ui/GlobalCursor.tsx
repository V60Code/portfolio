import { motion } from "framer-motion";
import useMousePosition from "@/hooks/use-mouse-position";

const GlobalCursor = () => {
  const { x, y } = useMousePosition();
  const size = 22; // diameter kecil global

  // Deteksi apakah pointer berada di dalam section introduce
  const introduceEl = typeof document !== "undefined" ? document.getElementById("introduce") : null;
  const rect = introduceEl?.getBoundingClientRect();
  const inIntroduce = rect ? x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom : false;

  return (
    <motion.div
      className="cursor-ring fixed top-0 left-0 pointer-events-none"
      aria-hidden
      style={{ width: size, height: size }}
      animate={{
        x: x - size / 2,
        y: y - size / 2,
        opacity: inIntroduce ? 0 : 1,
        scale: inIntroduce ? 0.8 : 1,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
    />
  );
};

export default GlobalCursor;