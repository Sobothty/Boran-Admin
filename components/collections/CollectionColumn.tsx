"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "@/components/custome-ui/Delete";
import Link from "next/link";

interface CollectionType {
    _id: string;
    title: string;
    products: { length: number }[];
  }

export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link
        href={`/collections/${row.original._id}`}
        className="hover:text-red-1"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => <p>{row.original.products.length}</p>,
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id} />,
  },
];