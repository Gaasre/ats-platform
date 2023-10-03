import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";

export default function DetailsPage() {
  return (
    <div className="flex gap-4">
      <div className="w-3/4 h-full">
        <Card>
          <CardHeader>
            <p className="font-semibold p-2">Job Description</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="text-sm px-4 pt-4 pb-8">
              <p>
                Orbit is on a mission to reinvent logistics, transforming it
                into a seamless, efficient, and &apos;automagic&apos;
                experience. We&apos;re changing the way companies operate in
                this sector with our modular, cloud-native platform, enabling
                them to do more with less. But we can&apos;t do it without you!
                <br />
                <br />
                The philosophy of our tech stack is to maximize efficiency and
                scalability. We achieve this by being as serverless as possible,
                utilizing cloud-native primitives, endorsing an event-driven
                asynchronous design with a unified event broker, and ensuring
                low maintenance is a built-in characteristic.
                <br />
                <br />
                We&apos;re currently on the hunt for a talented and passionate
                Full Stack Engineer who shares our vision and is excited to join
                our remote, but close-knit team.
              </p>
              <h2 className="text-xl font-semibold mb-4 mt-8">
                Responsibilities
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s.
                </li>
                <li>
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
                </li>
                <li>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.
                </li>
              </ul>
              <h2 className="text-xl font-semibold mb-4 mt-8">Requirements</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s.
                </li>
                <li>
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
                </li>
                <li>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.
                </li>
              </ul>
              <h2 className="text-xl font-semibold mb-4 mt-8">Benefits</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry
                  standard dummy text ever since the 1500s.
                </li>
                <li>
                  Letraset sheets containing Lorem Ipsum passages, and more
                  recently with desktop publishing software like Aldus PageMaker
                  including versions of Lorem Ipsum.
                </li>
                <li>
                  Class aptent taciti sociosqu ad litora torquent per conubia
                  nostra, per inceptos himenaeos.
                </li>
              </ul>
              <p className="mt-10">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
                eaque laborum quasi hic doloremque, blanditiis earum quae
                consectetur quaerat numquam aspernatur eveniet repudiandae
                expedita quis sunt voluptas nesciunt eius cupiditate.
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="w-1/4 h-full">
        <Card>
          <CardHeader>
            <p className="font-semibold p-2">Job Details</p>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="pb-2 px-2">
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Creation Date
                </p>
                <p className="text-sm">March 1, 2023</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Expiration Date
                </p>
                <p className="text-sm">Jun 1, 2023</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Contact Person
                </p>
                <div className="flex items-center gap-1">
                  <User
                    name="Jane Doe"
                    description="Hiring Manager"
                    avatarProps={{
                      src: "https://i.pravatar.cc/150",
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Capacity
                </p>
                <p className="text-sm">10</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Job Type
                </p>
                <p className="text-sm">Fulltime</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Location
                </p>
                <p className="text-sm">Berlin, Germany</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">Salary</p>
                <p className="text-sm">€80,000</p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-foreground-400 mb-1">
                  Last Updated
                </p>
                <p className="text-sm">2 days ago</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
