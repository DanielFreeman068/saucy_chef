import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div><p>Login / sign up page</p></div>
      <div className="flex flex-col items-center gap-4 mt-10">
      <Link href="/explore">
        <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Explore Recipes Page
        </button>
      </Link>
      <Link href="/create-recipe">
        <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Create Recipes Page
        </button>
      </Link>
      <Link href="/meal-planner">
        <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Meal Planner Page
        </button>
      </Link>
      <Link href="/select-recipie">
        <button className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 transition">
          Select Recipes Page
        </button>
      </Link>
    </div>

    </>
  );
}
