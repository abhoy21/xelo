import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: ["Download", "Pricing", "Marketplace"],
  },
  {
    title: "Resources",
    links: ["Documentation", "API Reference", "Release Notes"],
  },
  {
    title: "Company",
    links: ["About", "Blog", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy", "Terms", "Cookie Policy"],
  },
];

export default function Footer() {
  return (
    <footer className='w-full py-6 bg-[#1a1a1a] border-t border-gray-800'>
      <div className='container px-4 md:px-6 mx-auto'>
        <div className='grid gap-8 sm:grid-cols-2 md:grid-cols-4'>
          {footerLinks.map((section, index) => (
            <div key={index} className='space-y-3'>
              <h4 className='text-sm font-semibold'>{section.title}</h4>
              <ul className='space-y-1'>
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      className='text-sm text-gray-400 hover:text-blue-400 transition-colors'
                      href='#'
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-400'>
            © 2024 Xelo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
