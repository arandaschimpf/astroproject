import type { APIRoute } from "astro";
import { deleteTask } from "../../../service/task";

export const POST: APIRoute = async (context) => {
  const id = parseInt(context.params.id!, 10)

  await deleteTask(id)

  return context.redirect('/')
}