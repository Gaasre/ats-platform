"use client";

import { Bot, Filter, FormInput, GitMerge } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import "./styles.css";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Button } from "@nextui-org/button";
import Candidate from "@/components/candidate";
import { ICandidate } from "@/interfaces/candidate";
import ApplicationPlaceholder from "./application-placeholder";
import ResumeAnalyzer from "./resume-analyzer";
import Automation from "./automation";
import ApplicationDetails from "./application-details";
import AutomationDetails from "./automation-details";

const candidate: ICandidate = {
  id: "clox9ahbp0001um0kyh988jc1",
  firstName: "John",
  lastName: "Doe",
  email: "johndoe@email.com",
  phone: "123-456-7890",
  resumeLink:
    "https://pub-ccd5efe6d4824470bfd336f28a8d1322.r2.dev/resume-clox9ahbp0001um0kyh988jc1.pdf",
  date: new Date("2023-11-13T18:46:51.444Z"),
  customFields:
    '[{"id":"clofy444x0001um1ck2mmumqi","type":"text","name":"Are you allowed to work in the job location ?","value":"Yes"},{"id":"clofy54qs0003um1cr2qqaa9h","type":"text","name":"What\'s your salary expectations ?","value":"60000"}]',
  location: "New York, NY",
  portfolio: "https://johndoeportfolio.com",
  linkedin: "https://www.linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  university: "University of XYZ",
  educationLevel: "BS",
  graduationDate: new Date("2023-05-15T00:00:00.000Z"),
  majors: ["Computer Science"],
  skills: ["Java", "Python", "JavaScript"],
  languages: ["English", "Spanish"],
  experienceYears: 2.5,
  parsed: true,
  stageId: "clobo4rr40009umj81047yrj0",
  jobId: "clobo491k0007umj87im94wuq",
  projects: [
    {
      id: 4,
      name: "Project A",
      description: "Developed a web application using React",
      url: "https://projecta.com",
      candidateId: "clox9ahbp0001um0kyh988jc1",
    },
  ],
  workExperience: [
    {
      id: 5,
      jobTitle: "Software Engineer",
      company: "ABC Inc",
      location: "San Francisco, CA",
      startDate: new Date("2020-07-01T00:00:00.000Z"),
      endDate: new Date("2022-06-30T00:00:00.000Z"),
      duration: 2,
      jobSummary: "Developed and maintained software applications",
      candidateId: "clox9ahbp0001um0kyh988jc1",
    },
  ],
};

export default function Features() {
  const analyzer = useRef<HTMLLIElement>(null);
  const application = useRef<HTMLLIElement>(null);
  const automation = useRef<HTMLLIElement>(null);
  const filters = useRef<HTMLLIElement>(null);

  const { scrollYProgress } = useScroll();

  const [selected, setSelected] = useState("");
  const [color, setColor] = useState("primary-100");
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [open, setOpen] = useState("");

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
    console.log(value);
    if (value <= 0.28) {
      setSelected("");
      setColor("primary-100");
    } else if (value > 0.34 && value <= 0.38) {
      setSelected("analyzer");
      setColor("[#FCD5D4]");
    } else if (value > 0.38 && value <= 0.43) {
      setSelected("application");
      setColor("[#D5EED8]");
    } else if (value > 0.43 && value <= 0.49) {
      setSelected("automation");
      setColor("[#C8E3FE]");
    } else if (value > 0.49) {
      setSelected("filters");
      setColor("[#FCF6D4]");
    }
  };

  useEffect(() => scrollYProgress.on("change", (value) => onChange(value)), []);

  return (
    <section id="features" className="w-auto">
      <div className="relative">
        <AnimatePresence>
          {detailsVisible && (
            <motion.div
              animate={{
                opacity: 1,
              }}
              initial={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              className="z-30 bg-white/90 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-screen fixed text-2xl text-black flex items-center justify-center"
            >
              <motion.div
                layoutId="details"
                className="bg-white shadow-small relative rounded-lg flex flex-1 flex-col gap-3 p-6 max-w-5xl w-full"
              >
                {open == "analyzer" ? (
                  <Candidate candidate={candidate}></Candidate>
                ) : open == "application" ? (
                  <ApplicationDetails />
                ) : open == "automation" ? (
                  <AutomationDetails />
                ) : open == "filters" ? (
                  <p className="text-2xl font-semibold text-center">SOON...</p>
                ) : (
                  ""
                )}
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
          <h2 className="text-primary font-semibold text-xs mb-2">Features</h2>
          <h3 className="text-5xl font-semibold relative">
            <span className="z-10 relative">
              One Platform for Streamlined Global Hiring
            </span>
            <div className="bg-primary-200 h-10 w-[205px] absolute top-0 left-[235px]"></div>
          </h3>
          <div className="grid grid-cols-2 gap-32">
            <div className="py-[400px]">
              <ul className="space-y-12 features">
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
                <AnimatePresence>
                  {selected == "analyzer" ? (
                    <ResumeAnalyzer />
                  ) : selected == "application" ? (
                    <ApplicationPlaceholder />
                  ) : selected == "automation" ? (
                    <Automation />
                  ) : selected == "filters" ? (
                    <p className="text-2xl font-semibold">SOON...</p>
                  ) : (
                    ""
                  )}
                </AnimatePresence>
                <Button
                  className="bg-black hover:bg-black/80 font-bold text-white absolute right-8 bottom-4"
                  size="sm"
                  onClick={() => {
                    setOpen(selected);
                    setDetailsVisible(true);
                  }}
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
