import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { BsArrowLeft } from "react-icons/bs";
import invariant from "tiny-invariant";
import { getPronoun, updatePronoun } from "~/models/pronoun.server";
import { getSession, sessionStorage } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { pronounId } = params
  invariant(pronounId, "Please provide an id")
  const pronoun = await getPronoun(pronounId)
  return { pronoun }
};

export default function EditCategoryForm() {
  const { pronoun } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream py-8 px-4">
      <Link to="/admin" className="flex gap-1 items-center">
        <BsArrowLeft />
        <p className="py-4 text-lg">Back </p>
      </Link>
      <h1 className="text-5xl font-bold">Edit Pronoun</h1>
      <Form method="POST" className="mt-8">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="name">Name</label>
            <input type="text" name="name" id="name" defaultValue={pronoun.name} />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-700" type="submit">Submit</button>
            <input type="hidden" value={pronoun.id} name="id" />
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
  const id = formData.get("id") as string

  invariant(name, "Name is required")

  await updatePronoun(id, {
    name,
  })

  session.flash("globalMessage", "Person created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};