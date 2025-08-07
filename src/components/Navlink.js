"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Navlink({ navLink }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname();

  const isActive =
    pathname == navLink.route ||
    (navLink.route !== "/" && pathname.startsWith(navLink.route));

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        if (navLink.subMenu?.length > 0) setShowDropdown(true);
      }}
      onMouseLeave={() => setShowDropdown(false)}
    >
      <Link
        href={navLink.route}
        className={`${
          isActive ? "text-primary" : "text-gray-900 dark:text-white"
        } block py-2 px-3 md:p-0 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-primary`}
      >
        {navLink.label}
      </Link>

      {navLink.subMenu?.length > 0 ? (
        <div
          className={`${
            showDropdown ? "block" : "hidden"
          } absolute top-6 z-10 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44`}
        >
          <ul className="py-2 text-sm text-gray-700 ">
            {navLink.subMenu.map((menu, menuIndex) => (
              <li key={menuIndex}>
                <Link
                  href={`${navLink.route}/${menu.route}`}
                  className="block px-4 py-2 hover:bg-gray-100 "
                >
                  {menu.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
}

export default Navlink;
