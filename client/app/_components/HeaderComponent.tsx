import { Code, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full z-50 bg-[#131313] bg-opacity-80 backdrop-blur-md'>
      <Link className='flex items-center justify-center' href='#'>
        <Code className='h-6 w-6 text-blue-400' />
        <span className='ml-2 text-lg font-bold'>Xelo: Cloud_IDE</span>
      </Link>
      <nav
        className={`ml-auto flex gap-6 ${
          isMenuOpen ? "flex" : "hidden"
        } md:flex`}
      >
        {["Features", "Docs", "Extensions", "Blog"].map((item) => (
          <Link
            key={item}
            className='text-sm font-medium hover:text-blue-400 transition-colors'
            href='#'
          >
            {item}
          </Link>
        ))}
      </nav>
      <button
        className='ml-auto md:hidden'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Menu className='h-6 w-6' />
      </button>
    </header>
  );
}
