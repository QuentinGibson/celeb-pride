export default function About() {
  return (
    <main className="bg-cream py-8 px-4">
      <h1 className="text-5xl font-bold pb-8">About</h1>
      <div className="flex flex-col justify-start px-4">
        <div className="flex flex-col my-4">
          <h2 className="text-3xl font-bold">Celeb Pride Search</h2>
          <p className="text-lg my-4 w-[800px]">This is a project made for the MLH Pride Event 2023. Search from a list of celebrities, anime character, or anyone famous that is on the list. This was made by Quentin Gibson</p>
        </div>
        <div className="flex flex-col my-4">
          <h2 className="text-3xl font-bold">How to Use</h2>
          <p className="text-lg my-4 w-[800px]">To use this project just search for a celebrity that you have in mind. The app will direct you to a page with a list of all the results. Click on any celebrity to learn more about that celebrity.</p>
        </div>
      </div>

    </main>
  );
};