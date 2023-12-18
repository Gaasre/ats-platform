import { deleteFilter, updateFilter } from "@/lib/api";
import {
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Select,
  SelectItem,
  DropdownItem,
  Button,
  Chip,
} from "@nextui-org/react";
import { Filter, Operator } from "@prisma/client";
import { Trash } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const fields = [
  "Experience Years",
  "Education level",
  "Skills",
  "Availability",
  "Language",
];

export default function FilterItem({
  filter,
  jobId,
  onDelete,
}: {
  filter: Filter;
  jobId: string;
  onDelete: () => void;
}) {
  const [operatorKeys, setOperatorKeys] = useState<Set<Operator>>(
    new Set([Operator.EQUAL])
  );
  const [fieldValue, setFieldValue] = useState<Set<string>>(new Set([]));
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setOperatorKeys(new Set([filter.operator]));
    setFieldValue(new Set([filter.field]));
    setValue(filter.value);
  }, [filter]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      editFilter(
        Array.from(fieldValue).join(""),
        Array.from(operatorKeys).join("") as Operator,
        value
      );
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  const editFilter = async (
    field: string,
    operator: Operator,
    value: string
  ) => {
    await updateFilter(jobId, filter.id, {
      field: field,
      operator,
      value,
    });
  };

  const removeFilter = async () => {
    setLoading(true);
    await deleteFilter(jobId, filter.id);
    onDelete();
    setLoading(false);
  };

  const selectedFieldValue: string = useMemo(
    () => Array.from(fieldValue).join(""),
    [fieldValue]
  );

  const selectedValue: string = useMemo(() => {
    return Array.from(operatorKeys)
      .map((val) => {
        switch (val) {
          case Operator.EQUAL:
            return "=";
          case Operator.NOTEQUAL:
            return "≠";
          case Operator.HIGHER:
            return ">=";
          case Operator.LOWER:
            return "<=";
          case Operator.INCLUDES:
            return "inc";
          default:
            return "";
        }
      })
      .join(", ");
  }, [operatorKeys]);
  return (
    <div
      className={`flex gap-4 items-start px-3 ${
        selectedFieldValue == "Skills" ? "pt-3 pb-6" : "py-3"
      } border shadow rounded-md`}
    >
      <Select
        placeholder="Select a field"
        size="sm"
        labelPlacement="outside"
        selectedKeys={fieldValue}
        onSelectionChange={(props) => {
          setValue("");
          setFieldValue(props as any);
          editFilter(
            Array.from(props).join(""),
            Array.from(operatorKeys).join("") as Operator,
            ""
          );
        }}
      >
        {fields.map((field) => (
          <SelectItem key={field} value={field}>
            {field}
          </SelectItem>
        ))}
      </Select>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="flat" color="primary" size="sm">
            {selectedValue}
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          variant="flat"
          disallowEmptySelection
          selectionMode="single"
          selectedKeys={operatorKeys}
          onSelectionChange={(keys) => {
            setOperatorKeys(keys as any);
            editFilter(
              Array.from(fieldValue).join(""),
              Array.from(keys).join("") as Operator,
              value
            );
          }}
        >
          <DropdownItem key="EQUAL">
            <div className="space-x-2">
              <b className="text-primary-400">=</b> <span>Equal to</span>
            </div>
          </DropdownItem>
          <DropdownItem key="NOTEQUAL">
            <div className="space-x-2">
              <b className="text-primary-400">≠</b> <span>Not Equal to</span>
            </div>
          </DropdownItem>
          <DropdownItem key="HIGHER">
            <div className="space-x-2">
              <b className="text-primary-400">&gt;=</b> <span>Higher than</span>
            </div>
          </DropdownItem>
          <DropdownItem key="LOWER">
            <div className="space-x-2">
              <b className="text-primary-400">&lt;=</b> <span>Lower than</span>
            </div>
          </DropdownItem>
          <DropdownItem key="INCLUDES">
            <div className="space-x-2">
              <b className="text-primary-400">inc</b> <span>Includes</span>
            </div>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {selectedFieldValue == "Education level" ? (
        <Select
          items={[
            { id: 'BS', value: "BS" },
            { id: 'MS', value: "MS" },
            { id: 'PhD', value: "PhD" },
          ]}
          size="sm"
          isMultiline={false}
          selectionMode="multiple"
          placeholder="Select the levels"
          selectedKeys={value ? [...value.split(",")] : []}
          onSelectionChange={(keys) => {
            const arr = Array.from(keys);
            setValue(arr.join(","));
          }}
          labelPlacement="outside"
          renderValue={(items) => {
            return (
              <div className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <Chip className="h-5" variant="flat" size="sm" key={item.key}>
                    {item.data?.value}
                  </Chip>
                ))}
              </div>
            );
          }}
        >
          {(level) => (
            <SelectItem key={level.id} value={level.value}>
              {level.value}
            </SelectItem>
          )}
        </Select>
      ) : (
        <Input
          value={value}
          type={
            selectedFieldValue == "Experience Years"
              ? "number"
              : selectedFieldValue == "Availability"
              ? "date"
              : "text"
          }
          onValueChange={(val) => {
            setValue(val);
          }}
          placeholder="Value"
          description={
            selectedFieldValue == "Skills"
              ? "Skills should be separated by a comma."
              : ""
          }
          size="sm"
        ></Input>
      )}
      <Button
        onClick={removeFilter}
        variant="light"
        isIconOnly
        isLoading={loading}
        color="danger"
        size="sm"
      >
        {loading ? "" : <Trash size={16} />}
      </Button>
    </div>
  );
}
