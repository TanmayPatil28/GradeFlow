"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";


export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 15, filter: "blur(12px)", scale: 0.99 }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        mass: 0.5 
      }}
      className="will-change-transform"
    >
      {children}
    </motion.div>
  );
}
