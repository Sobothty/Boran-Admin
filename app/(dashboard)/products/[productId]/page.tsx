"use client"
import Loader from "@/components/custome-ui/Loader";
import ProductForm from "@/components/products/ProductForm";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const ProductDetail = ({ params }: { params: { productId: string } }) => {
    const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] =
    useState<ProductType | null>(null);

  const getProductDetails = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      });
      const data = await res.json();
      setProductDetails(data);
      setLoading(false);
    } catch (error) {
      console.log("[productId_GET]", error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, []);
  return loading ? <Loader/> : (
    <ProductForm initialData={productDetails}/>
  )
}

export default ProductDetail;
