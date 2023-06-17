import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getAllPeople } from "~/models/person.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const data = await getAllPeople();
  const url = new URL(request.url);
  const searchParam = new URLSearchParams(url.search);
  const query = searchParam.get("query") ?? "";
  console.log(`printing data`);
  console.log(
    data.filter((person) => {
      const name = person.name.toLowerCase();
      const nameFilter = query.toLocaleLowerCase();
      console.log(`Filtering ${name} with ${nameFilter}`);
      console.log(`Result: ${name.includes(nameFilter)}`);
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
      <div>
        <Form method="GET">
          <input type="text" name="query" />
          <button type="submit">Submit</button>
        </Form>
      </div>
      <ul>
        {filtered.map((person, index) => <li key={index}><Link to={`/celebrity/${person.id}`}>{person.name}</Link></li>)}
      </ul>
    </main>
  );
};