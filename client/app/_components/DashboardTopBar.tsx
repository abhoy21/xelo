import { Code } from "lucide-react";
import Link from "next/link";
import { UserMenu } from "./userMenu";

export function DashboardTopBar() {
  return (
    <header className='border-b border-[#2d2d2d] p-4'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='flex items-center space-x-4'>
          <Link className='flex items-center justify-center' href='/'>
            <Code className='h-6 w-6 text-blue-400' />
            <span className='ml-2 text-lg font-bold'>Xelo: Cloud_IDE</span>
          </Link>
        </div>
        <nav className='flex items-center space-x-4'>
          <ul className='flex space-x-4'>
            <li>
              <Link href='#' className='hover:text-primary transition-colors'>
                Dashboard
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-primary transition-colors'>
                Explore
              </Link>
            </li>
            <li>
              <Link href='#' className='hover:text-primary transition-colors'>
                Community
              </Link>
            </li>
          </ul>
          <UserMenu />
        </nav>
      </div>
    </header>
  );
}
