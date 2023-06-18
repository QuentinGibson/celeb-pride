import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllPeople } from "~/models/person.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const people = await getAllPeople()
  return { people }
};

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | All Contacts" }
  ]
}

export default function ContactRoute() {
  const { people } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream px-4 py-8">
      <h1 className="text-5xl mb-8 font-bold">People</h1>
      <ul>
        {people.map((person, index) =>
          <li key={index}>
            <div className="flex gap-1">
              <p className="font-bold">{index + 1} - {person.name}</p>
              <Link className="hover:underline" to={`/admin/celeb/edit/${person.id}`}>Edit Person</Link>
            </div>
          </li>
        )}
      </ul>
    </main>
  );
};