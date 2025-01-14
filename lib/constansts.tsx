import {
  LayoutDashboard,
  Shapes,
  ShoppingBag,
  Tag,
  UsersRound,
} from "lucide-react";

export const navLinks = [
  {
      url: "/",
      icon: <LayoutDashboard size={24} />,
      label: "Dashboard",
  },
  {
      url: "/collections",
      icon: <Shapes size={24} />,
      label: "Collections",
  },
  {
      url: "/products",
      icon: <Tag size={24} />,
      label: "Products",
  },
  {
      url: "/orders",
      icon: <ShoppingBag size={24} />,
      label: "Orders",
  },
  {
      url: "/customers",
      icon: <UsersRound size={24} />,
      label: "Customers",
  },
];
