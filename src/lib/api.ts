import { IInvitation } from "@/interfaces/invitation";
import { Filter, Operator } from "@prisma/client";

export async function getInvitation(
  id: string
): Promise<IInvitation & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/invitation/${id}`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}

export async function getFilters(
  jobId: string
): Promise<Filter[] & { error?: string }> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/filter/`,
    {
      method: "GET",
    }
  );

  const res = await req.json();
  return res;
}

export async function deleteFilter(
  jobId: string,
  id: string
): Promise<{ error?: string }> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/filter/${id}`,
    {
      method: "DELETE",
    }
  );

  const res = await req.json();
  return res;
}

export async function newFilter(
  jobId: string
): Promise<Filter & { error?: string }> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/filter`,
    {
      method: "POST",
    }
  );

  const res = await req.json();
  return res;
}

export async function updateFilter(
  jobId: string,
  id: string,
  filter: {
    field: string;
    operator: Operator;
    value: string;
  }
): Promise<{ error?: string }> {
  const req = await fetch(
    `http://localhost:3000/api/dashboard/jobs/${jobId}/filter/${id}`,
    {
      method: "PUT",
      body: JSON.stringify(filter),
    }
  );

  const res = await req.json();
  return res;
}
