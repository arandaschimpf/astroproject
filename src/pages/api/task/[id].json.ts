import type { APIRoute } from "astro";

export const DELETE: APIRoute = async (context) => {
  return new Response(null, {
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
  })
}