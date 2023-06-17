import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllPeople } from "~/models/person.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const data = await getAllPeople();
  const url = new URL(request.url);
  const searchParam = new URLSearchParams(url.search);
  const query = searchParam.get("query") ?? "";
  console.log(
    data.filter((person) => {
      const name = person.name.toLowerCase();
      const nameFilter = query.toLocaleLowerCase();
      return name.includes(nameFilter);
    })
  );
  const filtered = data.filter((person) =>
    person.name.toLowerCase().includes(query.toLowerCase())
  );
  return json({ filtered });
};

export default function Celebrities() {
  const { filtered } = useLoaderData<typeof loader>()
  return (
    <main>
      <div className="flex justify-center mt-16">
        <Form method="GET">
          <input type="text" name="query" className="px-2 py-3 bg-slate-500" />
          <button className="bg-slate-900 px-2 py-3 text-white" type="submit">Submit</button>
        </Form>
      </div>
      <div className="flex justify-center mt-8 flex-col items-center">
        <h2 className="text-3xl font-bold underline mb-8">Results</h2>
        <ul className="flex flex-col justify-center gap-2">
          {filtered.map((person, index) => <li key={index}><Link className="hover:underline" to={`/celebrity/${person.id}`}>{person.name}</Link></li>)}
        </ul>
      </div>
    </main>
  );
};