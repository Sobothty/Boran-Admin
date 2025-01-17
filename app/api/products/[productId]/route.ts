"use client"

import { connectToDB } from "@/lib/mongoDB"
import { NextRequest, NextResponse } from "next/server"
import Product from "@/lib/models/Product"
import Collection from "@/lib/models/Collection"


export const GET = async (req: NextRequest, { params } : { params : { productId: string} }) => {
    try{
        await connectToDB()

        const product = await Product.findById(params.productId).populate({ path: "collection", model: Collection })

        if (!product){
            return new NextResponse(JSON.stringify({message: "Product not found"}), { status : 404 })
        }

        return NextResponse.json(product, { status : 200 })
    }
    catch(err){
        console.log("[productId_GET]", err)
        return new NextResponse("Internal error", { status : 500 })
    }
}