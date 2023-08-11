export const Navbar = () => {
  return (
    <nav className="py-3 px-8 lg:px-44 bg-purple-600 flex justify-between text-lg font-semibold items-center">
      <div className="text-white">Logo</div>
      <div>
        <button className="py-2 px-3 rounded-full bg-white text-purple-500 hover:bg-slate-200 active:bg-purple-950">Logout</button>
      </div>
    </nav>
  );
};
