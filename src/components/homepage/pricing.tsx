"use client";

import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [selected, setSelected] = useState("monthly");
  return (
    <section id="pricing">
      <div className="text-center max-w-7xl mx-auto pt-[50px] pb-[100px] border-b">
        <h2 className="text-primary mb-8 font-semibold text-xs">
          Pricing
        </h2>
        <h3 className="text-5xl font-semibold mb-8">
          Plans that fit your scale
        </h3>
        <p className="text-foreground-500 mb-12">
          Simple, transparent pricing that grows with you. Schedule a Demo
          Today!
        </p>
        <div className="mb-24">
          <ul className="flex mx-auto bg-foreground-50 w-fit p-1 gap-2 rounded-md text-sm select-none">
            <li
              className={`${
                selected == "monthly"
                  ? "bg-background shadow-foreground-200 text-black"
                  : "bg-auto shadow-transparent text-foreground-500"
              } shadow rounded-md p-2 cursor-pointer transition-all duration-300`}
              onClick={() => setSelected("monthly")}
            >
              Monthly billing
            </li>
            <li
              className={`${
                selected == "annual"
                  ? "bg-background shadow-foreground-200 text-black"
                  : "bg-auto shadow-transparent text-foreground-500"
              } shadow rounded-md p-2 cursor-pointer transition-all duration-300 space-x-1`}
              onClick={() => setSelected("annual")}
            >
              <span>Annual billing</span>{" "}
              <span className="bg-foreground-200 text-xs py-1 px-2 rounded-full">
                Save 20%
              </span>
            </li>
          </ul>
        </div>
        <ul className="flex gap-4">
          <li className="rounded-lg shadow-lg border w-[400px] text-left">
            <div className="p-6 flex gap-2 items-end border-b">
              <div>
                <h3 className="font-semibold text-lg">Startup plan</h3>
                <p className="text-foreground-500 text-sm">
                  For startups and small business needs.
                </p>
              </div>
              <div className="flex space-x-1">
                <div className="text-2xl font-semibold">€</div>
                <div className="text-5xl font-semibold">90</div>
                <motion.div className="text-xs w-[40px]">
                  per {selected == "monthly" ? "month" : "year"}
                </motion.div>
              </div>
            </div>
            <div className="px-6 py-8 border-b">
              <p className="font-medium mb-4">Features</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Resume Parsing</p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Application Form Customization
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Stage Automation
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Candidate Customized Filtering
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Job Fit Indicator
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Analytics</p>
                </li>
              </ul>
            </div>
            <div className="flex justify-center p-6">
              <Button color="primary" className="w-full">
                Get started
              </Button>
            </div>
          </li>
          <li className="rounded-lg shadow-lg border-3 border-primary w-[400px] text-left relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 text-primary-50 bg-primary rounded-full px-4 py-1 text-xs">
              Popular
            </div>
            <div className="p-6 flex gap-2 items-end border-b">
              <div>
                <h3 className="font-semibold text-lg">Growth Plan</h3>
                <p className="text-foreground-500 text-sm">
                  Scale for growing businesses and teams.
                </p>
              </div>
              <div className="flex space-x-1">
                <div className="text-2xl font-semibold">€</div>
                <div className="text-5xl font-semibold">190</div>
                <motion.div className="text-xs w-[40px]">
                  per {selected == "monthly" ? "month" : "year"}
                </motion.div>
              </div>
            </div>
            <div className="px-6 py-8 border-b">
              <p className="font-medium mb-4">Features</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Resume Parsing</p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Application Form Customization
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Stage Automation
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Candidate Customized Filtering
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Job Fit Indicator
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Analytics</p>
                </li>
              </ul>
            </div>
            <div className="flex justify-center p-6">
              <Button color="primary" className="w-full">
                Get started
              </Button>
            </div>
          </li>
          <li className="rounded-lg shadow-lg border w-[400px] text-left">
            <div className="p-6 flex gap-2 items-end border-b">
              <div>
                <h3 className="font-semibold text-lg">Enterprise Plan</h3>
                <p className="text-foreground-500 text-sm">
                  Tailored for enterprise hiring needs.
                </p>
              </div>
              <div className="flex space-x-1">
                <div className="text-2xl font-semibold">€</div>
                <div className="text-5xl font-semibold">490</div>
                <motion.div className="text-xs w-[40px]">
                  per {selected == "monthly" ? "month" : "year"}
                </motion.div>
              </div>
            </div>
            <div className="px-6 py-8 border-b">
              <p className="font-medium mb-4">Features</p>
              <ul className="space-y-4">
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Resume Parsing</p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Application Form Customization
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Stage Automation
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Candidate Customized Filtering
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">
                    Job Fit Indicator
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <div className="text-white bg-primary p-1 rounded-full w-5 h-5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <p className="text-sm text-foreground-500">Analytics</p>
                </li>
              </ul>
            </div>
            <div className="flex justify-center p-6">
              <Button color="primary" className="w-full">
                Get started
              </Button>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
