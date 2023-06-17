import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { getPerson } from "~/models/person.server";

export const loader = async ({ request, params }: LoaderArgs) => {
  const { id } = params
  invariant(id, "Please provide an id")
  const person = await getPerson(id)
  return { person }
};

export default function Celebrity() {
  const { person } = useLoaderData<typeof loader>()
  return (
    <main>
      <img src={person.image} alt="" />
      <h1>{person.name}</h1>
      <h2>{person.category.name}</h2>
      <div>
        <h3>Age:</h3>
        <p>{person.age}</p>
      </div>
    </main>
  );
};