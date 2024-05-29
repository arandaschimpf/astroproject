import { g as getTasks, c as createTask, d as deletedCompletedtasks } from './_id__DvH3Xjz-.mjs';

process.env.PORT || 4321;
async function GET() {
  const taskList = await getTasks();
  return new Response(
    JSON.stringify({
      taskList
    })
  );
}
async function POST(context) {
  const data = await context.request.json();
  const task = await createTask(data.title);
  return new Response(
    JSON.stringify({
      task
    })
  );
}
async function PATCH() {
  const task = await deletedCompletedtasks();
  return new Response(
    JSON.stringify({
      task
    })
  );
}

export { GET, PATCH, POST };
