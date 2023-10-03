import NewPipelineItem from "./new-pipeline-item";
import PipelineList from "./pipeline-list";

async function addStage(jobId: string, title: string, color: string) {
  const res = await fetch(`http://localhost:3000/api/jobs/${jobId}/stage`, {
    method: "POST",
    body: JSON.stringify({
      title,
      color,
    }),
  });

  const data = await res.json();
  return data;
}

function deleteStage(jobId: string, stageId: string) {
  return fetch(`http://localhost:3000/api/jobs/${jobId}/stage/${stageId}`, {
    method: "DELETE",
  });
}

function updateStage(
  jobId: string,
  stageId: string,
  title: string,
  color: string
) {
  return fetch(`http://localhost:3000/api/jobs/${jobId}/stage/${stageId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      color,
    }),
  });
}

function moveStage(jobId: string, stageId: string, direction: "up" | "down") {
  return fetch(`http://localhost:3000/api/jobs/${jobId}/stage/${stageId}`, {
    method: "PATCH",
    body: JSON.stringify({
      direction,
    }),
  });
}

export default function HiringPipeline({ jobId }: { jobId: string }) {
  return (
    <div className="p-4">
      <h1 className="text-xl mb-8">Customize the Hiring Pipeline</h1>
      <div className="flex flex-col gap-4 w-4/5">
        <PipelineList
          jobId={jobId}
          onConfirm={(id, title, color) => updateStage(jobId, id, title, color)}
          onDelete={(id) => deleteStage(jobId, id)}
          onUp={(id) => moveStage(jobId, id, "up")}
          onDown={(id) => moveStage(jobId, id, "down")}
        />
      </div>
      <div className="mt-6 w-4/5">
        <NewPipelineItem
          onAdd={(title, color) => addStage(jobId, title, color)}
        ></NewPipelineItem>
      </div>
    </div>
  );
}
