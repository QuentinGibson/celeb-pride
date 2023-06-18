import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllPeopleAndFlags } from "~/models/person.server";
import { BsArrowLeft } from "react-icons/bs";

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | Browse Celebrities" }
  ]
}
export const loader = async ({ request, params }: LoaderArgs) => {
  const people = await getAllPeopleAndFlags()
  const url = new URL(request.url)
  const search = new URLSearchParams(url.search)
  const flag = search.get("flag")
  const letter = search.get("letter")
  let filteredPeople = people

  if (flag) {
    filteredPeople = people.filter(person => {
      return person.flag.name.trim() === flag
    })
  }

  if (letter) {
    filteredPeople = people.filter(person => person.name[0].toLowerCase() === letter.toLowerCase())
  }

  return { filteredPeople }
};

export default function BrowseCelebrities() {
  const { filteredPeople } = useLoaderData<typeof loader>()
  return (
    <main>
      <div className=" mx-8 my-8">
        <Link to="/browse" className="flex gap-2 items-center">
          <BsArrowLeft />
          <p className="font-bold text-lg">Back</p>
        </Link>
      </div>
      <div className="my-8 mx-8">
        <h1 className="font-bold text-4xl mb-4">Results</h1>
        <ul className="">
          {filteredPeople.map((person, index) => <li key={index}><Link to={`/celebrity/${person.id}`} className="hover:underline">{person.name}</Link></li>)}
        </ul>
      </div>
    </main>
  );
};