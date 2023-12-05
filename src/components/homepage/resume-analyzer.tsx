import { motion } from "framer-motion";
import Image from "next/image";

export default function ResumeAnalyzer() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="relative"
    >
      <Image
        src="/analyzer.png"
        height={358}
        width={353}
        alt="AI Resume Analyzer"
      ></Image>
      <motion.div
        layoutId="education"
        className="absolute bottom-16 left-3 bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left"
      >
        <p className="font-bold text-xs text-[#CC6C5A]">Software Engineer</p>
        <p className="text-xs text-[#CC6C5A]">Company X</p>
      </motion.div>
      <motion.div
        layoutId="personal"
        className="absolute -bottom-6 left-0 bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left"
      >
        <p className="font-bold text-xs text-[#CC6C5A]">Personal Details</p>
        <p className="text-xs text-[#CC6C5A]">
          Paris - France - <u>Github</u>
        </p>
      </motion.div>
      <motion.div
        layoutId="experience"
        className="absolute bottom-20 right-[17px] bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left"
      >
        <p className="font-bold text-xs text-[#CC6C5A]">Engineering Degree</p>
        <p className="text-xs text-[#CC6C5A]">University X</p>
      </motion.div>
      <div className="absolute bottom-0 right-[15px] bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left">
        <p className="font-bold text-xs text-[#CC6C5A]">Skills</p>
        <p className="text-xs text-[#CC6C5A]">Java - Python - Git</p>
      </div>
    </motion.div>
  );
}
