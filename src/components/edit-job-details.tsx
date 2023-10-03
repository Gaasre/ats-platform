import { Input, Textarea } from "@nextui-org/input";
import { Divider } from "@nextui-org/divider";
import React from "react";
import { Select, SelectItem } from "@nextui-org/select";
import { Avatar } from "@nextui-org/avatar";
import { useRecoilState } from "recoil";
import { jobDetailsState } from "@/state/application-form-state";
import { Spinner } from "@nextui-org/spinner";

export default function EditJobDetails() {
  const [jobDetails, setJobDetails] = useRecoilState(jobDetailsState);

  return (
    <div className="p-4 w-3/4">
      <h1 className="text-xl mb-8">Add Job details</h1>
      {jobDetails.id != "" ? (
        <div>
          <h2 className="text-lg mb-4">Content</h2>
          <Input
            type="text"
            label="Job title"
            placeholder="Enter the job title"
            labelPlacement="outside"
            className="mb-4"
            value={jobDetails.title}
            onValueChange={(value) => {
              setJobDetails({ ...jobDetails, title: value });
            }}
          />
          <Textarea
            label="Job Description"
            labelPlacement="outside"
            placeholder="Enter the job description"
            cols={8}
            className="mb-4"
            value={jobDetails.description}
            onValueChange={(value) => {
              setJobDetails({ ...jobDetails, description: value });
            }}
          />
          <Textarea
            label="Job Responsibilities"
            labelPlacement="outside"
            placeholder="Enter the job responsibilities"
            cols={8}
            className="mb-4"
            value={jobDetails.responsibilities}
            onValueChange={(value) => {
              setJobDetails({ ...jobDetails, responsibilities: value });
            }}
          />
          <Textarea
            label="Job Requirements"
            labelPlacement="outside"
            placeholder="Enter the job requirements"
            cols={8}
            className="mb-4"
            value={jobDetails.requirements}
            onValueChange={(value) =>
              setJobDetails({ ...jobDetails, requirements: value })
            }
          />
          <Textarea
            label="Job Benefits"
            labelPlacement="outside"
            placeholder="Enter the job benefits"
            cols={8}
            className="mb-4"
            value={jobDetails.benefits || ""}
            onValueChange={(value) =>
              setJobDetails({ ...jobDetails, benefits: value })
            }
          />
          <Divider className="my-6"></Divider>
          <h2 className="text-lg mb-4">Location</h2>
          <div className="flex gap-4">
            <Input
              type="text"
              label="Country"
              placeholder="Country"
              labelPlacement="outside"
              value={jobDetails.country}
              onValueChange={(value) =>
                setJobDetails({ ...jobDetails, country: value })
              }
            />
            <Input
              type="text"
              label="City"
              placeholder="City"
              labelPlacement="outside"
              value={jobDetails.city}
              onValueChange={(value) =>
                setJobDetails({ ...jobDetails, city: value })
              }
            />
          </div>
          <Divider className="my-6"></Divider>
          <h2 className="text-lg mb-4">Other Details</h2>
          <div className="flex gap-4 mb-6">
            <Select
              label="Contact Person"
              placeholder="Contact Person"
              labelPlacement="outside"
            >
              <SelectItem
                key="user1"
                startContent={
                  <Avatar
                    alt="User Image"
                    className="w-5 h-5"
                    src="https://i.pravatar.cc/150"
                  />
                }
              >
                John Doe
              </SelectItem>
            </Select>
            <Input
              type="date"
              label="Job Deadline"
              placeholder="Deadline"
              labelPlacement="outside"
              value={
                new Date(jobDetails.applicationDeadline ?? new Date())
                  .toISOString()
                  .split("T")[0]
              }
              onChange={(e) =>
                setJobDetails({
                  ...jobDetails,
                  applicationDeadline: new Date(e.target.value),
                })
              }
            />
          </div>
          <div className="flex gap-4 mb-6">
            <Select
              label="Employment Type"
              placeholder="Employment Type"
              labelPlacement="outside"
              selectedKeys={[jobDetails.employmentType]}
              onChange={(e) =>
                setJobDetails({ ...jobDetails, employmentType: e.target.value })
              }
            >
              <SelectItem key="Full-time">Full-time</SelectItem>
              <SelectItem key="Part-time">Part-time</SelectItem>
            </Select>
            <Select
              label="Experience Level"
              placeholder="Experience Level"
              labelPlacement="outside"
              selectedKeys={[jobDetails.experienceLevel]}
              onChange={(e) =>
                setJobDetails({
                  ...jobDetails,
                  experienceLevel: e.target.value,
                })
              }
            >
              <SelectItem key="Entry-level">Entry-level</SelectItem>
              <SelectItem key="Mid-level">Mid-level</SelectItem>
              <SelectItem key="Senior">Senior</SelectItem>
            </Select>
          </div>
          <div className="flex gap-4 mb-6">
            <Input
              label="Expected Salary"
              placeholder="0.00"
              labelPlacement="outside"
              value={jobDetails.salary + ""}
              onValueChange={(value) =>
                setJobDetails({ ...jobDetails, salary: parseInt(value) })
              }
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">/Year</span>
                </div>
              }
              startContent={
                <div className="flex items-center">
                  <label className="sr-only" htmlFor="currency">
                    Currency
                  </label>
                  <select
                    className="outline-none border-0 bg-transparent text-default-400 text-small"
                    value={jobDetails.currency}
                    onChange={(e) =>
                      setJobDetails({
                        ...jobDetails,
                        currency: e.target.value,
                      })
                    }
                  >
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
              }
              type="number"
            />
            <Input
              type="number"
              label="Recruitment Quota"
              placeholder="0"
              min={0}
              labelPlacement="outside"
              value={jobDetails.quota + ""}
              onValueChange={(value) =>
                setJobDetails({ ...jobDetails, quota: parseInt(value) })
              }
            />
          </div>
          <div className="flex gap-4 mb-6">
            <Select
              label="Job Type"
              placeholder="Job Type"
              labelPlacement="outside"
              className="w-1/2"
              selectedKeys={[jobDetails.jobType]}
              onChange={(e) =>
                setJobDetails({
                  ...jobDetails,
                  jobType: e.target.value,
                })
              }
            >
              <SelectItem key="Hybrid">Hybrid</SelectItem>
              <SelectItem key="On-site">On-site</SelectItem>
              <SelectItem key="Remote">Remote</SelectItem>
            </Select>
          </div>
        </div>
      ) : (
        <Spinner label="Loading" color="primary" labelColor="primary" />
      )}
    </div>
  );
}
