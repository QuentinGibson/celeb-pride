import { Form, Link } from "@remix-run/react";
import { BsArrowLeft } from 'react-icons/bs'
import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSession, requireUser, sessionStorage } from "~/session.server";
import { createPronoun } from "~/models/pronoun.server";

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | New Blog" }
  ]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  if (user.role !== "ADMIN") {
    redirect("/")
  }
  return {}
};

export default function NewBlogRoute() {

  return (
    <main className="bg-cream py-8 px-4">
      <Link to="/admin" className="flex gap-1 items-center">
        <BsArrowLeft />
        <p className="py-4 text-lg">Back </p>
      </Link>
      <h1 className="text-5xl font-bold">New Pronoun</h1>
      <Form method="POST" className="mt-8" encType="multipart/form-data">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-700" type="submit">Submit</button>
          </div>
        </div>
      </Form>
    </main>
  );
};

export const action = async ({ request, params }: DataFunctionArgs) => {
  const session = await getSession(request);
  const formData = await request.formData()

  const name = formData.get("name") as string

  invariant(name, "Name is required")

  await createPronoun({
    name,
  })

  session.flash("globalMessage", "Category created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};