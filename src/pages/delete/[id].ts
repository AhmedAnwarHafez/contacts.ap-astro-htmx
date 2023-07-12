import type { APIRoute } from "astro";

import * as db from "../../db/db";

export const del: APIRoute = async ({ params, redirect }) => {
  const { id } = params;
  if (id) {
    console.log(id);
    await db.deleteContact(+id);
  }
  return redirect("/", 301);
};
