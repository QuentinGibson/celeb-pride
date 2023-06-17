import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { BsArrowLeft } from "react-icons/bs";
import invariant from "tiny-invariant";
import { getAllCategory } from "~/models/category.server";
import { getAllFlag } from "~/models/flag.server";
import { getPerson, updatePerson } from "~/models/person.server";
import { getAllPronouns } from "~/models/pronoun.server";
import { getSession } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { celebId } = params
  invariant(celebId, "Please provide an id")
  const celeb = await getPerson(celebId)
  const pronouns = await getAllPronouns()
  const flags = await getAllFlag()
  const categories = await getAllCategory()
  return { celeb, pronouns, flags, categories }
};

export default function EditCategoryForm() {
  const { celeb, pronouns, flags, categories } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream py-8 px-4">
      <Link to="/admin" className="flex gap-1 items-center">
        <BsArrowLeft />
        <p className="py-4 text-lg">Back </p>
      </Link>
      <h1 className="text-5xl font-bold">Edit Person</h1>
      <Form method="POST" className="mt-8" encType="multipart/form-data">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" defaultValue={celeb.name} />
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="image">Image</label>
            <input required type="file" name="image" id="image" />
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="age">Age</label>
            <input required type="number" name="age" id="age" defaultValue={celeb.age} />
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="pronoun">Pronoun</label>
            <select name="pronoun" id="pronoun" defaultValue={celeb.pronoun.name}>
              {pronouns.map((pronoun, index) => <option key={index} value={pronoun.name}>{pronoun.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="pronoun">Categories</label>
            <select name="pronoun" id="pronoun" defaultValue={celeb.category.name}>
              {categories.map((category, index) => <option key={index} value={category.name}>{category.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="pronoun">Flags</label>
            <select name="pronoun" id="pronoun" defaultValue={celeb.flag.name}>
              {flags.map((flag, index) => <option key={index} value={flag.name}>{flag.name}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-700" type="submit">Submit</button>
            <input type="hidden" value={celeb.id} name="id" />
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
      directory: "./public/uploads/blog",
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
  const image = formData.get("image") as string
  const age = formData.get("age") as string
  const pronoun = formData.get("pronoun") as string
  const category = formData.get("category") as string
  const flag = formData.get("flag") as string
  const id = formData.get("id") as string

  invariant(name, "Name is required")
  invariant(image, "Image is required")
  invariant(age, "Age is required")
  invariant(pronoun, "Pronoun is required")
  invariant(category, "Category is required")
  invariant(flag, "Flag is required")

  await updatePerson(id, {
    name,
    image,
    age,
    pronoun,
    category,
    flag
  })

  session.flash("globalMessage", "Person created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};