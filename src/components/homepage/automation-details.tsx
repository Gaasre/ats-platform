import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  GripVertical,
  Mail,
  MoreVertical,
  Pencil,
  Trash,
} from "lucide-react";

export default function AutomationDetails() {
  return (
    <motion.div className="flex gap-8">
      <div className="w-[250px] flex p-4 flex-col gap-2">
        <Button
          color="primary"
          className="w-full justify-start"
          startContent={<CheckCircle2 />}
          variant="flat"
        >
          Job Details
        </Button>
        <Button
          color="primary"
          className="w-full justify-start"
          startContent={<CheckCircle2 />}
          variant="flat"
        >
          Application Form
        </Button>
        <Button variant="flat" className="w-full justify-start">
          Hiring Pipeline
        </Button>
      </div>
      <div className="flex-1">
        <h1 className="text-xl mb-8">Customize the Hiring Pipeline</h1>
        <div className="bg-white rounded-xl shadow-small px-3 py-4 flex items-center w-full space-x-2 mb-4">
          <GripVertical />
          <div className="bg-warning h-4 w-4 rounded"></div>
          <p className="text-sm font-semibold flex-1 text-left">Applied</p>
          <MoreVertical />
        </div>
        <div className="bg-white rounded-xl shadow-small px-3 py-4 flex items-center w-full space-x-2 mb-4">
          <GripVertical />
          <div className="bg-primary h-4 w-4 rounded"></div>
          <p className="text-sm font-semibold flex-1 text-left">HR Interview</p>
          <MoreVertical />
        </div>
        <div className="bg-white rounded-xl shadow-small px-3 py-4 w-full border-2 border-[#47A8FB] mb-4">
          <div className="flex items-center space-x-2 mb-4">
            <GripVertical />
            <div className="bg-[#47A8FB] h-4 w-4 rounded"></div>
            <p className="text-sm font-semibold flex-1 text-left">
              Technical Interview
            </p>
            <MoreVertical />
          </div>
          <div className="w-full p-4 space-y-2">
            <div className="bg-white border rounded-lg w-full flex items-center py-2 px-4 text-sm text-left space-x-2">
              <div className="py-1 px-2 rounded-lg bg-[#C8E3FE] text-[#47A8FB]">
                <Mail size={14} />
              </div>
              <p className="flex-1">
                Send <b>Technical Interview</b> email to candidate
              </p>
              <div>
                <Button isIconOnly size="sm" variant="light">
                  <Pencil size={16} />
                </Button>
                <Button isIconOnly size="sm" variant="light" color="danger">
                  <Trash size={16} />
                </Button>
              </div>
            </div>
            <div className="bg-white border rounded-lg w-full flex items-center py-2 px-4 text-sm text-left space-x-2">
              <div className="py-1 px-2 rounded-lg bg-[#C8E3FE] text-[#47A8FB]">
                <Mail size={14} />
              </div>
              <p className="flex-1">
                Send <b>Technical Interview</b> email to candidate
              </p>
              <div>
                <Button isIconOnly size="sm" variant="light">
                  <Pencil size={16} />
                </Button>
                <Button isIconOnly size="sm" variant="light" color="danger">
                  <Trash size={16} />
                </Button>
              </div>
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
        <div className="bg-white rounded-xl shadow-small px-3 py-4 flex items-center w-full space-x-2 mb-4">
          <GripVertical />
          <div className="bg-success h-4 w-4 rounded"></div>
          <p className="text-sm font-semibold flex-1 text-left">Accepted</p>
          <MoreVertical />
        </div>
        <div className="bg-white rounded-xl shadow-small px-3 py-4 flex items-center w-full space-x-2 mb-4">
          <GripVertical />
          <div className="bg-danger h-4 w-4 rounded"></div>
          <p className="text-sm font-semibold flex-1 text-left">Rejected</p>
          <MoreVertical />
        </div>
      </div>
    </motion.div>
  );
}
