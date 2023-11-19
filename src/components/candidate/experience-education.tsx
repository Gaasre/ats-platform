import { ICandidate } from "@/interfaces/candidate";
import { Chip } from "@nextui-org/chip";
import moment from "moment";
import React from "react";

export default function ExperienceEducation({
  candidate,
}: {
  candidate: ICandidate;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="grid grid-cols-2 text-sm mb-6 gap-y-2 px-4">
        <p className="font-medium text-default-400">Education level</p>
        <p className="font-semibold">{candidate.educationLevel}</p>
        <p className="font-medium text-default-400">Graduation year</p>
        <p className="font-semibold">
          {moment(candidate.graduationDate).format("YYYY")}
        </p>
        <p className="font-medium text-default-400">University</p>
        <p className="font-semibold">{candidate.university}</p>
        <p className="font-medium text-default-400">Majors</p>
        <ul>
          {candidate.majors.map((major, id) => (
            <Chip key={id} color="primary" variant="flat">
              {major}
            </Chip>
          ))}
        </ul>
      </div>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <ul className="text-sm space-y-3 mt-4 px-4">
        {candidate.workExperience.map((experience) => (
          <li
            key={experience.id}
            className="p-2 border border-default-100 shadow rounded-lg w-full"
          >
            <p className="font-semibold">{experience.jobTitle}</p>
            <p className="text-xs text-default-500 font-medium mb-1">
              {experience.company} - from{" "}
              {moment(experience.startDate).format("MMM YYYY")} to{" "}
              {moment(experience.endDate).format("MMM YYYY")}
            </p>
            <p>{experience.jobSummary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
