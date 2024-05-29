let tasks = [];
async function getTasks() {
  return tasks;
}
async function createTask(title) {
  const task = {
    id: Math.floor(Math.random() * 1e6).toString(),
    title,
    completed: false
  };
  tasks.push(task);
  return task;
}
async function deletedCompletedtasks() {
  tasks = tasks.filter((task) => !task.completed);
  return tasks;
}
async function toggleTask(id) {
  const task = tasks.find((task2) => task2.id === id);
  if (!task) {
    return task;
  }
  task.completed = false;
}

async function PUT(context) {
  const id = context.params.id;
  const task = await toggleTask(id);
  return new Response(
    JSON.stringify({
      task
    })
  );
}

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

export { _id_ as _, createTask as c, deletedCompletedtasks as d, getTasks as g };
