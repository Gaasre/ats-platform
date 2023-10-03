"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card, CardBody } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { Check, Plus, X } from "lucide-react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { stagesState } from "@/state/application-form-state";
import { Stage } from "@prisma/client";

type Props = {
  onAdd: (title: string, color: string) => Promise<Stage>;
};

export default function NewPipelineItem({ onAdd }: Props) {
  const [stages, setStages] = useRecoilState(stagesState);
  const [title, setTitle] = useState<string>("");
  const [color, setColor] = useState<string>("primary");
  const [isAdding, setIsAdding] = useState<boolean>(false);

  if (isAdding) {
    return (
      <Card>
        <CardBody>
          <div className="flex gap-2 items-center">
            <Input
              value={title}
              onValueChange={(val) => setTitle(val)}
              type="string"
              placeholder="Title"
              label="Title"
            />
            <Select
              label="Color"
              placeholder="Select a color"
              className="max-w-xs"
              selectedKeys={[color]}
              onChange={(e) => setColor(e.target.value)}
            >
              {["primary", "success", "warning", "danger"].map((color) => (
                <SelectItem key={color} value={color}>
                  {color}
                </SelectItem>
              ))}
            </Select>
            <Button
              variant="flat"
              color="success"
              onClick={async () => {
                const data = await onAdd(title, color);
                setIsAdding(false);
                setTitle("");
                setColor("primary");
                setStages([
                  ...stages,
                  {
                    ...data,
                    isEditing: false,
                  },
                ]);
              }}
            >
              Confirm
            </Button>
            <Button
              variant="flat"
              color="danger"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
          </div>
        </CardBody>
      </Card>
    );
  } else {
    return (
      <Button
        onClick={() => setIsAdding(true)}
        variant="flat"
        color="primary"
        startContent={<Plus />}
      >
        Add New Stage
      </Button>
    );
  }
}
