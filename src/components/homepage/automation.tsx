import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import { GripVertical, Mail, MoreVertical } from "lucide-react";

export default function Automation() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="w-[400px]"
    >
      <div className="bg-white rounded-xl shadow-small px-3 py-4 flex items-center w-full space-x-2 mb-4">
        <GripVertical />
        <div className="bg-success h-4 w-4 rounded"></div>
        <p className="text-sm font-semibold flex-1 text-left">HR Interview</p>
        <MoreVertical />
      </div>
      <div className="bg-white rounded-xl shadow-small px-3 py-4 w-full border-2 border-[#47A8FB]">
        <div className="flex items-center space-x-2 mb-4">
          <GripVertical />
          <div className="bg-[#47A8FB] h-4 w-4 rounded"></div>
          <p className="text-sm font-semibold flex-1 text-left">
            Technical Interview
          </p>
          <MoreVertical />
        </div>
        <div className="w-full p-4 space-y-2">
          <div className="bg-white border rounded-xl w-full flex items-center p-2 text-xs text-left space-x-2">
            <div className="py-1 px-2 rounded-lg bg-[#C8E3FE] text-[#47A8FB]">
              <Mail size={14} />
            </div>
            <p>
              Send <b>Technical Interview</b> email to candidate
            </p>
          </div>
          <div className="bg-white border rounded-xl w-full flex items-center p-2 text-xs text-left space-x-2">
            <div className="py-1 px-2 rounded-lg bg-[#C8E3FE] text-[#47A8FB]">
              <Mail size={14} />
            </div>
            <p>
              Send <b>Technical Interview</b> email to candidate
            </p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            size="sm"
            className="bg-[#C8E3FE] text-[#47A8FB] font-semibold hover:bg-[#47A8FB]/40"
          >
            + Add Action
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
