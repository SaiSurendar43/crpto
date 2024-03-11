import Image from "next/image";
import logo from '../../../public/logo.png';

export default function Header() {
  return (
    <main>
      <header className="p-4 border-none bg-zinc-800 shadow-lg">
        <nav className="flex flex-col items-center justify-between sm:flex-row">
          <div className="flex items-center">
            <Image width={48} height={48} src={logo} alt="Logo" className="h-8 w-12" />
            <span className="ml-2 text-lg font-bold">swap</span>
          </div>

          <div className="mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input
                type="text"
                name="price"
                id="price"
                className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Search tokens and NFT collections"
              />
            </div>
          </div>

          <div className="flex mt-4 sm:mt-0">
            <a href="#" className="text-white hover:text-blue-500 pr-3">Get the app</a>
            <a href="#" className="text-white hover:text-blue-500">Connect</a>
          </div>
        </nav>
      </header>
    </main>
  );
}
