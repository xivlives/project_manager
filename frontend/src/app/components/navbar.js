// components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            <button>sort.dev</button>
          </Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <Link href="/auth/signup">
            <button className="border-2  border-gray-700 transform transition duration-500 hover:bg-gray-700 px-3 py-2 rounded">Organize your projects Now!</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
