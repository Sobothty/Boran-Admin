"use client"
import { ColumnDef } from "@tanstack/react-table"
import  Delete  from "../custome-ui/Delete"


export const columns: ColumnDef<CollectionType>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => <p className="text-primary">{row.original.title}</p>
  },
  {
    accessorKey: "prodcuts",
    header: "Products",
    cell: ({row}) => <p className="text-primary">{row.original.products.length}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete id={row.original._id}/>
  },
]