import { Form, Link, useLoaderData } from "@remix-run/react";
import { BsArrowLeft } from 'react-icons/bs'
import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { getSession, requireUser, sessionStorage } from "~/session.server";
import { getAllCategory } from "~/models/category.server";
import { getAllPronouns } from "~/models/pronoun.server";
import { getAllFlag } from "~/models/flag.server";
import { createPerson } from "~/models/person.server";

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | New Celebrity" }
  ]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  if (user.role !== "ADMIN") {
    redirect("/")
  }
  const pronouns = await getAllPronouns()
  const flags = await getAllFlag()
  const categories = await getAllCategory()
  return { pronouns, flags, categories }
};

export default function NewBlogRoute() {
  const { pronouns, flags, categories } = useLoaderData<typeof loader>()

  return (
    <main className="bg-cream py-8 px-4">
      <Link to="/admin" className="flex gap-1 items-center">
        <BsArrowLeft />
        <p className="py-4 text-lg">Back </p>
      </Link>
      <h1 className="text-5xl font-bold">New Person</h1>
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
            <label className="text-lg" htmlFor="age">Age</label>
            <input required type="number" name="age" id="age" />
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="pronoun">Pronoun</label>
            <select name="pronoun" id="pronoun">
              {pronouns.map((pronoun, index) => <option key={index} value={pronoun.name}>{pronoun.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="categories">Categories</label>
            <select name="category" id="categories">
              {categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="flags">Flags</label>
            <select name="flag" id="flags">
              {flags.map((flag, index) => <option key={index} value={flag.name}>{flag.name}</option>)}
            </select>
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
      directory: "./public/uploads/person",
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
  const age = formData.get("age") as string
  const pronoun = formData.get("pronoun") as string
  const category = formData.get("category") as string
  const flag = formData.get("flag") as string

  invariant(name, "Name is required")
  invariant(image, "Image is required")
  invariant(age, "Age is required")
  invariant(pronoun, "Pronoun is required")
  invariant(category, "Category is required")
  invariant(flag, "Flag is required")

  const publicIndex = image.filepath.indexOf("uploads") - 1
  const url = image.filepath.slice(publicIndex)

  await createPerson({
    name,
    image: url,
    age: Number(age),
    pronoun: { connect: { name: pronoun } },
    category: { connect: { name: category } },
    flag: { connect: { name: flag } }
  })

  session.flash("globalMessage", "Person created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};