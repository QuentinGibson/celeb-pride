import type { V2_MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";


export const meta: V2_MetaFunction = () => [{ title: "Celeb Pride" }];

export default function Index() {
  return (
    <main className="flex flex-col mx-auto w-full">
      <div className="relative w-full bg-[url('/pride-banner-background.jpg')] px-10 py-8 mt-24">
        <div className="flex justify-center my-4">
          <div className="bg-slate-900 px-24 py-6">
            <h1 className="text-white text-5xl font-bold leading-loose tracking-wide">Celeb Pride Search</h1>
          </div>
        </div>
      </div>
      <Form className="flex justify-center my-4" method="GET" action="/celebrities">
        <div className="flex">
          <input type="text" name="query" id="" className="bg-slate-500 px-2 py-3 select-none focus:ring-0 text-white" />
          <button type="submit" className="px-2 py-2 bg-slate-900 text-white font-bold">Search</button>
        </div>
      </Form>
    </main>
  );
}
