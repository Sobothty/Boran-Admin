"use client"
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Loader from '@/components/custome-ui/Loader'
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/custome-ui/DataTable'
import { Separator } from '@/components/ui/separator'
import { Plus } from "lucide-react"
import { useRouter } from 'next/navigation'
import { columns } from '@/components/products/ProductColumns'

const Products = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<ProductType[]>([])

  const getProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET",
      })
      const data = await res.json()
      setProducts(data)
      setLoading(false)
    } catch (err) {
      console.log("[products_GET]", err)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return loading ? <Loader/> : (
    <div className='px-10 py-5'>
       <div className="flex items-center justify-between">
        <p className="text-heading2-bold text-primary">Products</p>
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={() => router.push("/products/new")}>
          <Plus className="h-4 w-4 mr-2"/>
          Create Product
        </Button>
      </div>
      <Separator className="bg-primary my-4 h-1"/>
      <DataTable columns={columns} data={products} searchKey="title"/>
    </div>
  )
}
export default Products;
