const Navbar = () => {
  return (
    <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <button className="text-gray-500 focus:outline-none md:hidden">
          {/* Menu icon for mobile */}
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      
      <div className="flex items-center">
        <div className="relative">
          <button className="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <span className="inline-block h-8 w-8 rounded-full overflow-hidden bg-gray-100">
              <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;