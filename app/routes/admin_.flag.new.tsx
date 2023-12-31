import { Form, Link } from "@remix-run/react";
import { BsArrowLeft } from 'react-icons/bs'
import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSession, requireUser, sessionStorage } from "~/session.server";
import { createFlag } from "~/models/flag.server";

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | New Flag" }
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
      <h1 className="text-5xl font-bold">New Flag</h1>
      <Form method="POST" className="mt-8" encType="multipart/form-data">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" />
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="image">Image</label>
            <input required type="file" name="image" id="image" />
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
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      directory: "./public/uploads/flags",
      avoidFileConflicts: true,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );

  const name = formData.get("name") as string
  const image = formData.get("image") as any

  invariant(name, "Name is required")

  const publicIndex = image.filepath.indexOf("uploads") - 1
  const url = image.filepath.slice(publicIndex)

  await createFlag({
    name,
    image: url
  })

  session.flash("globalMessage", "Flag created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};