import { NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/upload", label: "Upload" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/history", label: "History" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-green-500 font-semibold"
    : "text-gray-300 hover:text-green-400";

const Navbar = () => {

  return (
    <nav className="bg-slate-900 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-green-500">
          AI Nutrition Coach
        </h1>

        <div className="flex gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;