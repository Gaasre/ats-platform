import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import Image from "next/image";
import Link from "next/link";
import { Check, Loader } from "lucide-react";
import Worldmap from "./worldmap";

export default function Hero() {
  return (
    <div>
      <section id="header" className="mb-24">
        <div className="px-14 pt-6 flex items-center justify-evenly">
          <Image src="/Logo.png" width={126} height={37} alt="Logo" />
          <ul className="space-x-5">
            <li className="inline-block group relative">
              <div className="absolute w-0 h-0.5 bg-primary bottom-0 group-hover:w-full transition-all"></div>
              <Link href="#">Home</Link>
            </li>
            <li className="inline-block group relative">
              <div className="absolute w-0 h-0.5 bg-primary bottom-0 group-hover:w-full transition-all"></div>
              <Link href="#">Features</Link>
            </li>
            <li className="inline-block group relative">
              <div className="absolute w-0 h-0.5 bg-primary bottom-0 group-hover:w-full transition-all"></div>
              <Link href="#">Pricing</Link>
            </li>
            <li className="inline-block group relative">
              <div className="absolute w-0 h-0.5 bg-primary bottom-0 group-hover:w-full transition-all"></div>
              <Link href="#">Blog</Link>
            </li>
          </ul>
          <Button
            color="primary"
            as={Link}
            className="rounded-full px-8 font-semibold hover:bg-primary-700"
            href="/signin"
          >
            Sign Up
          </Button>
        </div>
      </section>
      <section id="hero">
        <div className="max-w-2xl mx-auto text-center relative">
          <h1 className="text-6xl font-bold mb-7">
            Take Recruitment to The Next Level
          </h1>
          <h2 className="text-black/70 max-w-lg mx-auto">
            HireNest’s recruitment software transforms your hiring abilities to
            build your workforce of the future.
          </h2>
          <Image
            src="/Title-line.png"
            className="absolute top-28 -z-10 bottom-0 left-0 right-0 mx-auto"
            width={465}
            height={23}
            alt="Title Line"
          ></Image>
        </div>
        <div className="relative h-[550px] max-w-[1400px] mx-auto overflow-hidden">
          <div className="text-center pt-12">
            <Button
              color="primary"
              as={Link}
              className="rounded-full px-16 font-bold text-lg h-[60px] hover:bg-primary-700"
              href="/signin"
            >
              Hire Now
            </Button>
          </div>
          <Worldmap></Worldmap>
          <Image
            src="/Candidate-path.png"
            className="mx-auto absolute -bottom-10 left-0 right-0 -z-10"
            width={1100}
            height={386}
            alt="Candidate Path"
          ></Image>
          <Image
            src="/White-shadow.png"
            className="absolute bottom-0 z-10"
            width={1440}
            height={197}
            alt="Shadow"
          ></Image>
          <div className="flex max-w-4xl mx-auto mt-20 gap-4 items-center">
            <div className="rounded-2xl bg-white border-2 border-primary-700 px-7 py-6 shadow-lg shadow-primary-100 flex flex-col items-center z-20">
              <Avatar
                alt="Candidate Avatar"
                className="w-24 h-24 mb-2 bg-primary-50"
                src="https://i.pravatar.cc/96?img=8"
              ></Avatar>
              <p className="text-sm text-primary-700 font-semibold">
                Alex Jones
              </p>
              <p className="text-xs text-primary-700/70 mb-5">
                Software Engineer
              </p>
              <div className="text-[10px] bg-primary-700 text-center w-24 select-none text-white py-px rounded-full">
                Applied
              </div>
            </div>
            <div className="rounded-2xl bg-white border-2 border-primary-700 px-7 py-6 shadow-lg shadow-primary-100 flex flex-col items-center z-20">
              <Avatar
                alt="Candidate Avatar"
                className="w-24 h-24 mb-2 bg-primary-50"
                src="https://i.pravatar.cc/96?img=32"
              ></Avatar>
              <p className="text-sm text-primary-700 font-semibold">
                Alex Jones
              </p>
              <p className="text-xs text-primary-700/70 mb-5">
                Software Engineer
              </p>
              <div className="text-[10px] bg-primary-700 text-center w-24 select-none text-white py-px rounded-full">
                Applied
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="w-9 h-9 bg-primary-200 text-primary-700 rounded-full flex items-center justify-center">
                <Loader size={22} className="animate-spinner-ease-spin" />
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="rounded-2xl bg-white border-2 border-primary-700 px-7 py-6 shadow-lg shadow-primary-100 flex flex-col items-center z-20">
                <Avatar
                  alt="Candidate Avatar"
                  icon={<Check className="text-primary-300" size={64} />}
                  className="w-24 h-24 mb-2 bg-primary-600"
                ></Avatar>
                <p className="text-sm text-primary-700 font-semibold">
                  Alex Jones
                </p>
                <p className="text-xs text-primary-700/70 mb-5">
                  Software Engineer
                </p>
                <div className="text-[10px] bg-primary-700 text-center w-24 select-none text-white py-px rounded-full">
                  Hired
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-14 z-20 relative">
            <h3 className="text-xl">Find global talent now</h3>
            <p className="text-sm">
              HireNest helps companies build and scale their worldwide hiring
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
