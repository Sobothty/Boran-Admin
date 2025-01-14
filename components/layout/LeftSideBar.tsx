'use client'
import { navLinks } from "@/lib/constansts";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const leftSideBar = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-primary text-white shadow-xl max-lg:hidden">
      <Image src="/BoranLogo.png" alt="Logo" height={20} width={70} />
      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-secondery": "text-white"}`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex gap-4 text-body-medium items-center ">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  );
};

export default leftSideBar;
