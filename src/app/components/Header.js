import Image from "next/image";
import logo from '../../../public/logo.png';

export default function Header() {
  return (
    <main>
    <header className="p-4 border-none bg-black shadow-lg">
      <nav className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <Image width={48} height={48} src={logo} alt="Logo" className="h-8 w-12" />
          <a href = "#"><span className="ml-2 text-lg font-bold">swap</span></a>
          <a href = "#"><span className="ml-2 text-lg font-bold">Explore</span></a>
          <a href = "#"><span className="ml-2 text-lg font-bold">Ntfs</span></a>
          <a href = "#"><span className="ml-2 text-lg font-bold">pool</span></a>
        </div>

        <div>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span class="text-gray-500 sm:text-sm">$</span>
    </div>
    <input type="text" name="price" id="price" class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="search tokens and ntf collections"/>
  </div>
</div>

        <div className="flex"> 
        <a href="#" className="text-white hover:text-blue-500 pr-3">get the app</a>
          <a href="#" className="text-white hover:text-blue-500">connect</a>


          
        </div>
      </nav>
    </header>
    </main>
  );
}
