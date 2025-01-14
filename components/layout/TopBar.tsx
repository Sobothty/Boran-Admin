'use client'
import Link from "next/link";
import Image from "next/image";
import { navLinks } from "@/lib/constansts";
import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { url } from "inspector";
import { text } from "stream/consumers";

const TopBar = () => {
  const [DropDownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-primary shadow-xl lg:hidden">
      <Image src="/BoranLogo.png" alt="Logo" height={20} width={70} />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-secondery": "text-white"}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4 items-center ">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropDownMenu(!DropDownMenu)}
        />
        {DropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-5 p-5 bg-white text-primary shadow-xl rounded-lg">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon}<p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
