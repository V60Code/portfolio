import { motion } from "framer-motion";
import useMousePosition from "@/hooks/use-mouse-position";

const GlobalCursor = () => {
  const { x, y } = useMousePosition();
  const size = 22; // diameter kecil global
  // Selalu tampilkan cursor global, termasuk di section introduce

  return (
    <motion.div
      className="cursor-ring fixed top-0 left-0 pointer-events-none"
      aria-hidden
      style={{ width: size, height: size }}
      animate={{
        x: x - size / 2,
        y: y - size / 2,
        opacity: 1,
        scale: 1,
      }}
      transition={{ type: "tween", ease: "easeOut", duration: 0.35 }}
    />
  );
};

export default GlobalCursor;