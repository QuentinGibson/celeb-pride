import type { V2_MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";


export const meta: V2_MetaFunction = () => [{ title: "Celeb Pride" }];

export default function Index() {
  return (
    <main className="min-h-[500px] bg-[url('/pride-banner-background.jpg')] max-w-7xl flex mx-auto">
      <div className="relative sm:pb-16 sm:pt-8  w-full">
        <div className="flex justify-center mb-4">
          <div className="bg-slate-900 px-24 py-6">
            <h1 className="text-white text-5xl font-bold leading-loose tracking-wide">Celeb Pride Search</h1>
          </div>
        </div>
        <Form className="flex justify-center" method="GET" action="/celebrities">
          <div className="flex">
            <input type="text" name="query" id="" className="bg-blue-500 px-2 py-2 select-none focus:ring-0" />
            <button type="submit" className="px-2 py-2 bg-blue-900 text-white">Search</button>
          </div>
        </Form>
      </div>
    </main>
  );
}
