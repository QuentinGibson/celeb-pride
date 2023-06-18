import { LoaderArgs, json, redirect } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { requireUser } from "~/session.server";

export function meta({ matches }: { matches: any }) {
  const rootMeta = matches[0].meta;
  const title = rootMeta.find((m: any) => m.title)
  return [
    { title: title.title + " | Admin" }
  ]
}

export const loader = async ({ request, params }: LoaderArgs) => {
  const user = await requireUser(request)
  if (user.role !== "ADMIN") {
    redirect("/")
  }
  return json({})
};

export default function ComponentName() {
  return (
    <main className="bg-cream py-8 px-4">
      <h1 className="text-5xl font-bold pb-8">Admin</h1>
      <ul>
        <li><Link className="hover:underline" to="/admin/celeb/new">New Celebrity</Link></li>
        <li><Link className="hover:underline" to="/admin/celebs">Edit Celebrity</Link></li>
        <li><Link className="hover:underline" to="/admin/category/new">New Category</Link></li>
        <li><Link className="hover:underline" to="/admin/categories/">Edit Category</Link></li>
        <li><Link className="hover:underline" to="/admin/flag/new">New Flag</Link></li>
        <li><Link className="hover:underline" to="/admin/flags">Edit Flag</Link></li>
        <li><Link className="hover:underline" to="/admin/pronoun/new">New Pronouns</Link></li>
        <li><Link className="hover:underline" to="/admin/pronouns">Edit Pronouns</Link></li>
      </ul>
    </main>
  );
};