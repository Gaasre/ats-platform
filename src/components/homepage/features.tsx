"use client";

import { Bot, Filter, FormInput, GitMerge } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Button } from "@nextui-org/button";

export default function Features() {
  const analyzer = useRef<HTMLLIElement>(null);
  const application = useRef<HTMLLIElement>(null);
  const automation = useRef<HTMLLIElement>(null);
  const filters = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll();

  const [selected, setSelected] = useState("");
  const [color, setColor] = useState("foreground-200");
  const [detailsVisible, setDetailsVisible] = useState(false);

  const goTo = (block: string) => {
    switch (block) {
      case "analyzer":
        analyzer.current?.scrollIntoView({ block: "center" });
        break;
      case "application":
        application.current?.scrollIntoView({ block: "center" });
        break;
      case "automation":
        automation.current?.scrollIntoView({ block: "center" });
        break;
      case "filters":
        filters.current?.scrollIntoView({ block: "center" });
        break;

      default:
        break;
    }
  };

  const onChange = (value: number) => {
    if (value < 0.5) {
      setSelected("");
      setColor("foreground-200");
    } else if (value > 0.6 && value <= 0.72) {
      setSelected("analyzer");
      setColor("[#FCD5D4]");
    } else if (value > 0.72 && value <= 0.82) {
      setSelected("application");
      setColor("[#D5EED8]");
    } else if (value > 0.82 && value <= 0.92) {
      setSelected("automation");
      setColor("[#C8E3FE]");
    } else if (value > 0.92) {
      setSelected("filters");
      setColor("[#FCF6D4]");
    }
  };

  useEffect(() => scrollYProgress.on("change", (value) => onChange(value)), []);

  return (
    <section id="features">
      <div className="relative h-screen">
        <AnimatePresence>
          {detailsVisible && (
            <motion.div
              animate={{
                opacity: 1,
              }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="z-30 bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen fixed text-2xl text-black flex items-center justify-center"
            >
              <motion.div
                layoutId="details"
                className="bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left"
              >
                <p className="font-bold text-xs text-[#CC6C5A]">
                  Software Engineer
                </p>
                <p className="text-xs text-[#CC6C5A]">Company X</p>
              </motion.div>
              <Button
                className="bg-black hover:bg-black/80 font-bold text-white absolute right-8 bottom-4"
                size="sm"
                onClick={() => setDetailsVisible(false)}
              >
                Back to Website
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <Image
          src="/Left-rectangles.png"
          width={1040}
          height={1425}
          alt="Left Rectangles"
          className="absolute -left-80 top-20"
        ></Image>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold relative">
            <span className="z-10 relative">
              One Platform for Streamlined Global Hiring
            </span>
            <div className="bg-primary-200 h-10 w-[158px] absolute top-0 left-[330px]"></div>
          </h2>
          <div className="grid grid-cols-2 gap-32">
            <div className="py-[400px]">
              <ul className="space-y-12">
                <li
                  className={`${selected == "analyzer" ? "active" : ""}`}
                  onClick={() => goTo("analyzer")}
                  ref={analyzer}
                >
                  <div>
                    <span className="text-[#FA826C] bg-[#FCD5D4] h-10 w-10 rounded-full flex items-center justify-center">
                      <Bot />
                    </span>
                  </div>
                  <div>
                    <h3>AI Resume Analyzer</h3>
                    <p>
                      HireNest efficiently extracts crucial data from resumes
                      for streamlined recruitment processes.
                    </p>
                  </div>
                </li>
                <li
                  className={`rounded-xl py-6 px-3 text-left w-[465px] flex gap-4 transition-all shadow-none ${
                    selected == "application" ? "active" : ""
                  }`}
                  onClick={() => goTo("application")}
                  ref={application}
                >
                  <div>
                    <span className="text-[#7BD879] bg-[#D5EED8] h-10 w-10 rounded-full flex items-center justify-center">
                      <FormInput />
                    </span>
                  </div>
                  <div>
                    <h3>Tailored Application Experience</h3>
                    <p>
                      Craft personalized application forms that match your
                      company&apos;s unique needs.
                    </p>
                  </div>
                </li>
                <li
                  className={`rounded-xl py-6 px-3 text-left w-[465px] flex gap-4 transition-all shadow-none ${
                    selected == "automation" ? "active" : ""
                  }`}
                  onClick={() => goTo("automation")}
                  ref={automation}
                >
                  <div>
                    <span className="text-[#47A8FB] bg-[#C8E3FE] h-10 w-10 rounded-full flex items-center justify-center">
                      <GitMerge />
                    </span>
                  </div>
                  <div>
                    <h3>Stage Automation</h3>
                    <p>
                      Automate actions when candidates move through stages. Send
                      emails or add notes automatically, ensuring a smooth
                      recruitment process.
                    </p>
                  </div>
                </li>
                <li
                  className={`rounded-xl py-6 px-3 text-left w-[465px] flex gap-4 transition-all shadow-none ${
                    selected == "filters" ? "active" : ""
                  }`}
                  onClick={() => goTo("filters")}
                  ref={filters}
                >
                  <div>
                    <span className="text-[#FBDE47] bg-[#FCF6D4] h-10 w-10 rounded-full flex items-center justify-center">
                      <Filter />
                    </span>
                  </div>
                  <div>
                    <h3>Custom Screening Filters</h3>
                    <p>
                      Set specific criteria for candidate screening
                      effortlessly. Filter applicants based on customized rules,
                      ensuring quality matches every time.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="h-screen sticky top-0 flex items-center select-none">
              <div
                className={`bg-${color} flex-grow-0 relative w-[500px] h-[500px] rounded-[43px] transition-all duration-300 ease-in-out flex items-center justify-center`}
              >
                <div
                  className={`feature-image relative ${
                    selected == "analyzer" ? "active" : ""
                  }`}
                >
                  <Image
                    src="/analyzer.png"
                    height={358}
                    width={353}
                    alt="AI Resume Analyzer"
                  ></Image>
                  <motion.div
                    layoutId="details"
                    className="absolute bottom-16 left-3 bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left"
                  >
                    <p className="font-bold text-xs text-[#CC6C5A]">
                      Software Engineer
                    </p>
                    <p className="text-xs text-[#CC6C5A]">Company X</p>
                  </motion.div>
                  <div className="absolute -bottom-6 left-0 bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left">
                    <p className="font-bold text-xs text-[#CC6C5A]">
                      Personal Details
                    </p>
                    <p className="text-xs text-[#CC6C5A]">
                      Paris - France - <u>Github</u>
                    </p>
                  </div>
                  <div className="absolute bottom-20 right-[17px] bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left">
                    <p className="font-bold text-xs text-[#CC6C5A]">
                      Engineering Degree
                    </p>
                    <p className="text-xs text-[#CC6C5A]">University X</p>
                  </div>
                  <div className="absolute bottom-0 right-[15px] bg-white border-2 border-[#FA826C] rounded-lg py-2 px-3 text-left">
                    <p className="font-bold text-xs text-[#CC6C5A]">Skills</p>
                    <p className="text-xs text-[#CC6C5A]">
                      Java - Python - Git
                    </p>
                  </div>
                </div>
                <Button
                  className="bg-black hover:bg-black/80 font-bold text-white absolute right-8 bottom-4"
                  size="sm"
                  onClick={() => setDetailsVisible(true)}
                >
                  Show me
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
