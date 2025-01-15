import { NextRequest, NextResponse} from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    // Wait for the auth() Promise to resolve
    const { userId } = await auth();
    
    if (!userId) {
        return new NextResponse("Unauthorized", {status: 403});
    }

    await connectToDB();
    const {title, description, image} = await req.json();
    const existingCollection = await Collection.findOne({title});

    if(existingCollection) {
        return new NextResponse("Collection already exist", {status: 400});
    }

    if(!title || !image) {
        return new NextResponse("Title and image are required", {status: 400});
    }

    const newCollection = await Collection.create({
        title,
        description,
        image,
        userId, // You might want to store the userId with the collection
    });

    await newCollection.save();

    return NextResponse.json(newCollection, {status: 200});

  } catch (err) {
    console.log("[collections_POST]", err);
    return new NextResponse("Internal Server Error", {status: 500});
  }
};