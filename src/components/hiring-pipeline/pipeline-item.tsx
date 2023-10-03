"use client";

import { Card, CardHeader, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Check, ChevronDown, ChevronUp, Pencil, Trash, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";

type Props = {
  title: string;
  color: string;
  goUp: () => void;
  goDown: () => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  onDelete: () => void;
  onConfirm: (title: string, color: string) => void;
};

export default function PipelineItem({
  title,
  color,
  goUp,
  goDown,
  isEditing,
  setIsEditing,
  onDelete,
  onConfirm,
}: Props) {
  const [internalTitle, setInternalTitle] = useState(title);
  const [internalColor, setInternalColor] = useState(color);

  return (
    <Card className={`border-t-4 border-${internalColor} w-full`}>
      <CardBody className="py-1">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Go Up"
              onClick={goUp}
            >
              <ChevronUp size={14} />
            </Button>
            <Button
              isIconOnly
              variant="light"
              size="sm"
              aria-label="Go Down"
              onClick={goDown}
            >
              <ChevronDown size={14} />
            </Button>
          </div>
          {isEditing ? (
            <div className="flex gap-4 w-full">
              <Input
                value={internalTitle}
                onValueChange={(val) => setInternalTitle(val)}
                type="string"
                label="Value"
                className="flex-1"
              />
              <Select
                label="Color"
                placeholder="Select a color"
                className="max-w-xs"
                selectedKeys={[internalColor]}
                onChange={(e) => setInternalColor(e.target.value)}
              >
                {["primary", "success", "warning", "danger"].map((color) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </Select>
            </div>
          ) : (
            <p className="flex-1">{internalTitle}</p>
          )}
          {isEditing ? (
            <div className="flex flex-col gap-1">
              <Button
                isIconOnly
                variant="light"
                color="success"
                size="sm"
                aria-label="Confirm"
                onClick={() => onConfirm(internalTitle, internalColor)}
              >
                <Check size={14} />
              </Button>
              <Button
                isIconOnly
                variant="light"
                size="sm"
                aria-label="Cancel"
                onClick={() => {
                  setIsEditing(!isEditing);
                  setInternalTitle(title);
                  setInternalColor(color);
                }}
              >
                <X size={14} />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                aria-label="Edit Field"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Pencil size={14} />
              </Button>
              <Button
                isIconOnly
                variant="light"
                color="danger"
                size="sm"
                aria-label="Delete Field"
                onClick={onDelete}
              >
                <Trash size={14} />
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
