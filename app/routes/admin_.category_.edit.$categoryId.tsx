import type { DataFunctionArgs, LoaderArgs } from "@remix-run/node";
import { redirect, unstable_composeUploadHandlers, unstable_createFileUploadHandler, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { BsArrowLeft } from "react-icons/bs";
import invariant from "tiny-invariant";
import { getCategory, updateCategory } from "~/models/category.server";
import { getSession } from "~/session.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { categoryId } = params
  invariant(categoryId, "Please provide an id")
  const category = await getCategory(categoryId)
  return { category }
};

export default function EditCategoryForm() {
  const { category } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream py-8 px-4">
      <Link to="/admin" className="flex gap-1 items-center">
        <BsArrowLeft />
        <p className="py-4 text-lg">Back </p>
      </Link>
      <h1 className="text-5xl font-bold">Edit Category</h1>
      <Form method="POST" className="mt-8" encType="multipart/form-data">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <label className="text-lg" htmlFor="name">Name</label>
            <input required type="text" name="name" id="name" defaultValue={category.name} />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-yellow-700" type="submit">Submit</button>
            <input type="hidden" name="id" value={category.id} />
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
  const id = formData.get("id") as string

  invariant(name, "Name is required")

  await updateCategory(id, {
    name
  })

  session.flash("globalMessage", "Category created sucessfully!")
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.commitSession(session) } })
};