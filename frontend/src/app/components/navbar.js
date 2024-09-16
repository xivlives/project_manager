// components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            <button>MyApp</button>
          </Link>
        </div>
        <div className="hidden lg:flex space-x-4">
          <Link href="/">
            <button className="hover:bg-gray-700 px-3 py-2 rounded">Home</button>
          </Link>
          <Link href="/about">
            <button className="hover:bg-gray-700 px-3 py-2 rounded">About</button>
          </Link>
          <Link href="/services">
            <button className="hover:bg-gray-700 px-3 py-2 rounded">Services</button>
          </Link>
          <Link href="/contact">
            <button className="hover:bg-gray-700 px-3 py-2 rounded">Contact</button>
          </Link>
        </div>
        <div className="lg:hidden">
          <button className="px-2 py-1 border border-gray-400 rounded">
            Menu
          </button>
        </div>
      </div>
    </nav>
  );
}
