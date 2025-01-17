"use client"
import { ColumnDef } from "@tanstack/react-table"
import  Delete  from "../custome-ui/Delete"
import Link from "next/link"


export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => (<Link href={`/collections/${row.original._id}`} className="text-primary hover:text-red-600">{row.original.title}</Link>)
  },
  {
    accessorKey: "prodcuts",
    header: "Products",
    cell: ({row}) => <p className="text-primary">{row.original.products.length}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="collection" id={row.original._id}/>
  },
]