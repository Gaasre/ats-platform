"use client";

import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Faq() {
  return (
    <section id="faqs">
      <div className="py-[100px] flex max-w-7xl mx-auto gap-8">
        <div className="w-2/5">
          <h2 className="text-primary font-semibold text-xs mb-2">Support</h2>
          <h3 className="text-3xl font-semibold mb-4">FAQs</h3>
          <p className="text-foreground-500 text-sm leading-6">
            Everything you need to know about the product and billing.
            Can&apos;t find the answer you&apos;re looking for? <br />
            Please <a className="underline" href="#">chat to our friendly team</a>
          </p>
        </div>
        <div className="w-3/5">
          <Accordion
            showDivider={false}
            itemClasses={{
              title: "font-semibold text-sm",
              content: "text-foreground-500 text-sm pb-6",
            }}
          >
            <AccordionItem
              key="1"
              aria-label="Accordion 1"
              title="Is there a trial period available for testing the platform's features?"
            >
              Instead of a trial period, we offer a personalized demonstration
              of the platform&apos;s features. Request a demo to experience our
              functionalities firsthand.
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Can I customize my subscription plan based on specific feature requirements?"
            >
              Certainly! We offer flexibility in customizing subscription plans
              to accommodate specific feature needs. Get in touch with our team,
              and we&apos;ll work on tailoring a plan that suits your
              requirements.
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label="Accordion 3"
              title="How secure is the platform in handling sensitive candidate information?"
            >
              We prioritize data security and employ robust measures to
              safeguard all information on our platform. Our systems adhere to
              industry-standard security protocols to ensure the confidentiality
              and integrity of your data.
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label="Accordion 4"
              title="Are there any limitations on the number of users or job postings based on subscription tiers?"
            >
              Yes, our subscription tiers have varying limits on users and job
              postings. Details on user capacity and job posting limits are
              available on our pricing page or can be discussed with our sales
              team.
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label="Accordion 5"
              title="Can I integrate your platform with other tools or software we currently use?"
            >
              While direct integrations are not currently offered, we&apos;re
              open to discussing possibilities. Get in touch with us, and
              let&apos;s explore potential solutions to align with your existing
              tools and software.
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
