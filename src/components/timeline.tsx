import { Divider } from "@nextui-org/divider";
import TimelineItem from "./timeline-item";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function Timeline() {
  return (
    <ScrollShadow className="h-[500px]">
      <div className="flex gap-8 px-4">
        <div className="h-auto">
          <Divider orientation="vertical" />
        </div>
        <div>
          <TimelineItem />
          <TimelineItem />
          <TimelineItem />
          <TimelineItem />
          <TimelineItem />
          <TimelineItem />
        </div>
      </div>
    </ScrollShadow>
  );
}
