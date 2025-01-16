"use client"
import { columns } from "@/components/collections/CollectionColumn"
import { DataTable } from "@/components/custome-ui/DataTable"
import { Button } from "@/components/ui/button"
import { Separator } from "@radix-ui/react-separator"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"


const Collections = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const [collections, setCollections] = useState([])

  const getCollections = async () => {
    try{
      const res = await fetch(`/api/collections`, {
        method: "GET",
      })
      const data = await res.json()
      setCollections(data)
      setLoading(false)
    }
    catch(err){
      console.log("[collections_GET]", err)
    }
  }

  useEffect(() => {
    getCollections()
  }, [])

  console.log(collections)
  return (
    <div className="px-10 py-5">
      <div className="flex items-center justify-between">
        <p className="text-heading2-bold text-primary">Collections</p>
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => router.push("/collections/new")}>
          <Plus className="h-4 w-4 mr-2"/>
          Create Collection
        </Button>
      </div>
      <Separator className="bg-primary my-4 h-1"/>
      <DataTable columns={columns} data={collections} searchKey="title"/>
    </div>
  )
}

export default Collections


