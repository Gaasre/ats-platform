import { motion } from "framer-motion";
import { AtSign, User, File } from "lucide-react";

export default function ApplicationPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="select-none text-left bg-white p-4 rounded-2xl shadow-small"
    >
      <p className="text-[#386037] font-bold text-xl">Software Engineer Job</p>
      <p className="text-[#386037]/70 font-bold text-sm mb-4">Company XYZ</p>
      <div className="space-y-1 mb-12">
        <div className="bg-[#7BD879]/70 h-3 w-[120px] rounded-full mb-4"></div>
        <div className="bg-[#7BD879]/40 h-3 w-[380px] rounded-full"></div>
        <div className="bg-[#7BD879]/40 h-3 w-[315px] rounded-full"></div>
        <div className="bg-[#7BD879]/40 h-3 w-[360px] rounded-full"></div>
        <div className="bg-[#7BD879]/40 h-3 w-[280px] rounded-full"></div>
        <div className="bg-[#7BD879]/40 h-3 w-[330px] rounded-full"></div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <div className="bg-[#7BD879]/40 h-3 w-[120px] rounded-full"></div>
          <div className="bg-[#7BD879]/40 h-8 rounded-lg hover:bg-[#7BD879]/60 transition-all duration-300 cursor-text text-[#386037] flex items-center px-2">
            <User size={16} strokeWidth={3} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-[#7BD879]/40 h-3 w-[120px] rounded-full"></div>
          <div className="bg-[#7BD879]/40 h-8 rounded-lg hover:bg-[#7BD879]/60 transition-all duration-300 cursor-text text-[#386037] flex items-center px-2">
            <AtSign size={16} strokeWidth={3} />
          </div>
        </div>
        <div className="space-y-2">
          <div className="bg-[#7BD879]/40 h-3 w-[120px] rounded-full"></div>
          <div className="bg-[#7BD879]/40 h-8 rounded-lg hover:bg-[#7BD879]/60 transition-all duration-300 cursor-text text-[#386037] flex items-center px-2">
            <File size={16} strokeWidth={3} />
          </div>
        </div>
      </div>

      <div className="text-xs font-bold text-[#386037] mx-auto w-[220px] h-8 bg-[#7BD879] rounded-lg flex items-center justify-center hover:bg-[#73C871] transition-all duration-300 cursor-pointer">
        Apply
      </div>
    </motion.div>
  );
}
