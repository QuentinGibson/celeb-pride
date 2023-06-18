import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllFlag } from "~/models/flag.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const flags = await getAllFlag()
  return { flags }
};

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | All Contacts" }
  ]
}

export default function ContactRoute() {
  const { flags } = useLoaderData<typeof loader>()
  return (
    <main className="bg-cream px-4 py-8">
      <h1 className="text-5xl mb-8 font-bold">Flags</h1>
      <ul>
        {flags.map((flag, index) =>
          <li key={index}>
            <div className="flex gap-1">
              <p className="font-bold">{index + 1} - {flag.name}</p>
              <Link className="hover:underline" to={`/admin/flag/edit/${flag.id}`}>Edit Pronoun</Link>
            </div>
          </li>
        )}
      </ul>
    </main>
  );
};
