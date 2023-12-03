"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Worldmap() {
  const { scrollYProgress } = useScroll();
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 40], {
    clamp: true,
  });

  const [valueState, setValueState] = useState(rotation.get());

  useEffect(() => rotation.on("change", setValueState), []);

  return (
    <div className="absolute -top-4 -z-10" style={{ perspective: "300px" }}>
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${valueState}deg)`,
        }}
      >
        <Image src="/Map.png" width={1400} height={875} alt="Worldmap"></Image>
      </motion.div>
    </div>
  );
}
