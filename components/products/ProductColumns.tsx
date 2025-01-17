"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custome-ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "title",
    header: () => <span className="text-primary">Title</span>,
    cell: ({ row }) => (
      <Link
        href={`/products/${row.original._id}`}
        className="text-primary hover:text-red-600"
      >
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: "category",
    header: () => <span className="text-primary">Category</span>,
    cell: ({ row }) => (
      <span className="text-primary">{row.original.category}</span>
    ),
  },
  {
    accessorKey: "collections",
    header: () => <span className="text-primary">Collections</span>,
    cell: ({ row }) => (
      <span className="text-primary">
        {row.original.collections.map((collection) => collection.title).join(", ")}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: () => <span className="text-primary">Price ($)</span>,
    cell: ({ row }) => (
      <span className="text-primary">{row.original.price}</span>
    ),
  },
  {
    accessorKey: "expense",
    header: () => <span className="text-primary">Expense ($)</span>,
    cell: ({ row }) => (
      <span className="text-primary">{row.original.expense}</span>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <Delete item="product" id={row.original._id} />,
  },
];