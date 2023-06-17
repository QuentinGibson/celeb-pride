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
      <div className="flex flex-col gap-4 items-center py-6">
        <div className="flex gap-3 max-w-5xl">
          <img className="w-6/12" src={person.image} alt="" width={400} />
          <img className="w-6/12" src={person.flag.image} alt="" />
        </div>
        <h1 className="font-bold text-5xl">{person.name}</h1>
        <div className="flex gap-2">
          <h3 className="font-bold text-xl">Flag:</h3>
          <span className="text-lg">{person.flag.name}</span>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold text-xl">Category:</h3>
          <span className="text-lg">{person.category.name}</span>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold text-xl">Pronouns:</h3>
          <span className="font-bold italic text-lg">{person.pronoun.name}</span>
        </div>
        <div className="flex gap-2">
          <h3 className="font-bold text-xl">Age:</h3>
          <p className="text-lg">{person.age}</p>
        </div>
      </div>
    </main>
  );
};