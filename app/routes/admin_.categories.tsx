import { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllCategory } from "~/models/category.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const categories = await getAllCategory()
  return { categories }
};

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | All Contacts" }
  ]
}

export default function ContactRoute() {
  const { categories } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream px-4 py-8">
      <h1 className="text-5xl mb-8 font-bold">Contacts</h1>
      <ul>
        {categories.map((category, index) =>
          <li key={index}>
            <div className="flex gap-1">
              <p className="font-bold">{index + 1} - {category.name}</p>
              <Link className="hover:underline" to={`/admin/categories/edit/${category.id}`}>View Category</Link>
            </div>
          </li>
        )}
      </ul>
    </main>
  );
};