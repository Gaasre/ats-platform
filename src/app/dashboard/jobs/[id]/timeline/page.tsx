import NoteItem from "@/components/note-item";
import Timeline from "@/components/timeline";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

export default function TimelinePage() {
  return (
    <div className="flex gap-4">
      <div className="h-full w-1/2">
        <Card>
          <CardHeader>
            <p className="font-semibold p-2">Notes</p>
          </CardHeader>
          <CardBody className="h-full overflow-y-auto">
            <ScrollShadow className="h-[500px]">
              <NoteItem />
              <NoteItem />
              <NoteItem />
              <NoteItem />
              <NoteItem />
            </ScrollShadow>
          </CardBody>
        </Card>
      </div>
      <div className="h-full w-1/2">
        <Card>
          <CardHeader>
            <p className="font-semibold p-2">Timeline</p>
          </CardHeader>
          <CardBody>
            <Timeline />
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
