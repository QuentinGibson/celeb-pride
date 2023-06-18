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
    { title: title.title + " | Browse" }
  ]
}

const AlphabetLink = ({ to, children }: any) => {
  return (
    <Link className="hover:underline text-blue-600 text-lg" to={to}>{children}</Link>
  )
}

export default function BrowseRoute() {
  const { flags } = useLoaderData<typeof loader>()
  return (
    <main>
      <div className="mx-8 my-8">
        <h1 className="font-bold text-4xl">Browse</h1>
      </div>
      <section className="mx-8 my-8">
        <h2 className="text-2xl font-bold mb-4">Search By Flag</h2>
        <ul className="grid grid-cols-4 gap-4">
          {flags.map((flag, index) => (
            <li className="flex flex-col gap-2" key={index}>
              <Link className="flex flex-col gap-2 justify-center" to={`/browse/celebrities?flag=${flag.name}`}>
                <img className="w-[200px]" src={flag.image} alt="" />
                <p className="text-lg">{flag.name}</p>
              </Link>
            </li>))}
        </ul>
      </section>
      <section className="mx-8 my-8">
        <h2 className="text-2xl font-bold mb-4">Alphabetical</h2>
        <div className="flex gap-2">
          <AlphabetLink to="/browse/celebrities?letter=a">A</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=b">B</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=c">C</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=d">D</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=e">E</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=f">F</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=g">G</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=h">H</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=i">I</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=j">J</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=k">K</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=l">L</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=m">M</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=n">N</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=o">O</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=p">P</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=q">Q</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=r">R</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=s">S</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=t">T</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=u">U</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=v">V</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=w">W</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=x">X</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=y">Y</AlphabetLink>
          <AlphabetLink to="/browse/celebrities?letter=z">Z</AlphabetLink>
        </div>
      </section>

    </main>
  );
};