import type { APIRoute } from "astro";
import { addTask } from "../../../service/task";

export const POST: APIRoute = async (context) => {
  const data = await context.request.formData()

  const id = parseInt(data.get('id') as string)
  const title = data.get('name') as string
  const completed = true

  if (!id || !title) {
    return context.redirect('/?error=Invalid%20input')
  }

  const task = { id, title, completed  }
  await addTask(task)

  return context.redirect('/')
}