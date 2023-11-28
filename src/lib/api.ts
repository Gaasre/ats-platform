import { IInvitation } from "@/interfaces/invitation";

export async function getInvitation(
  id: string
): Promise<IInvitation & { error?: string }> {
  const req = await fetch(`http://localhost:3000/api/invitation/${id}`, {
    method: "GET",
  });

  const res = await req.json();
  return res;
}
