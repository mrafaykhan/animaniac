
export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-8 sm:p-20">
      <main className="flex flex-col gap-6 items-center max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold mb-2">Welcome to Animeniac</h1>
        <p className="text-lg text-gray-700">
          Animeniac is your hub for exploring and comparing anime titles. Discover similarities, differences, and more between your favorite shows with our intuitive comparison tools.
        </p>
        <p className="text-md text-gray-500 mt-4">
          Use the navigation bar above to explore the app, including the anime comparison page and more features.
        </p>
      </main>
    </div>
  );
}