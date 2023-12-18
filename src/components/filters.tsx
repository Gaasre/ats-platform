"use client";

import { Button } from "@nextui-org/react";
import FilterItem from "./filter-item";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { getFilters, newFilter } from "@/lib/api";
import { Filter } from "@prisma/client";

export default function Filters({ jobId }: { jobId: string }) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loadingAdd, setLoadingAdd] = useState(false);

  useEffect(() => {
    getFilters(jobId).then((res) => {
      if (!res.error) {
        setFilters(res);
      }
    });
  }, []);

  const addFilter = async () => {
    setLoadingAdd(true);
    const filter = await newFilter(jobId);
    if (!filter.error) {
      setFilters([...filters, filter]);
    }
    setLoadingAdd(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-8">Customize Candidate Filters</h1>
      <div className="max-w-2xl relative px-10">
        <div className="relative">
          {filters.length > 1 ? (
            <>
              <div className="absolute w-8 h-0.5 bg-primary rounded-full top-7 -left-9"></div>
              <div className="absolute w-8 h-0.5 bg-primary rounded-full bottom-7 -left-9"></div>
              <div className="absolute w-0.5 h-[calc(100%-58px)] bg-primary rounded-full top-7 -left-9"></div>
              <div className="absolute font-semibold text-xs p-1 text-primary-50 bg-primary rounded-full border-2 border-white top-1/2 -left-[54px] transform -translate-y-1/2">
                AND
              </div>
            </>
          ) : (
            ""
          )}
          <div className="flex flex-col gap-2">
            {filters.map((filter) => (
              <FilterItem key={filter.id} filter={filter} jobId={jobId} onDelete={() => setFilters(filters.filter((f) => f.id != filter.id))} />
            ))}
          </div>
        </div>
        <div className="my-2">
          <Button
            color="primary"
            startContent={<Plus size={18} />}
            variant="light"
            size="sm"
            isLoading={loadingAdd}
            onClick={addFilter}
          >
            Add rule
          </Button>
        </div>
      </div>
    </div>
  );
}
