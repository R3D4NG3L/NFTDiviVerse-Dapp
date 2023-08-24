import { FC } from "react";
import { Navbar } from "flowbite-react";
import Image from 'next/image';

const Menu: FC<{}> = () => {
  return (
    <>
      {/* Menu START */}
      <Navbar
        fluid={true}
        rounded={true}
        className="px-2 sm:px-4 py-2.5 bg-gradient-to-b from-neutral-900 to-neutral-800 fixed w-full z-20 top-0 left-0 border-b border-neutral-200 border-neutral-600"
      >
        <Navbar.Brand href="#">
          <Image src="/assets/logo.png" className="mr-3 h-6 sm:h-9" alt="NftDiviVerse" width="133" height="31"/>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="flex flex-col p-4 mt-4 rounded-lg border border-gray-800 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 border-gray-700 bg-gradient-to-b from-neutral-900 to-neutral-800">
          <Navbar.Link
            href="#"
            className="uppercase block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-red-700 md:p-0 md:hover:text-white text-gray-400 hover:bg-gray-700 hover:text-white md:hover:bg-transparent border-gray-700"
          >
            Back to website
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      {/* Menu END */}
    </>
  );
}

export default Menu;
