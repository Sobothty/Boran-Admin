// import { NextRequest, NextResponse} from "next/server";
// import { auth } from "@clerk/nextjs/server";
// import { connectToDB } from "@/lib/mongoDB";
// import Collection from "@/lib/models/Collection";

// export const POST = async (req: NextRequest) => {
//   try {
//     const { userId } = await auth();
    
//     if (!userId) {
//       return new NextResponse("Unauthorized", { status: 403 });
//     }

//     await connectToDB();
//     const { title, description, image } = await req.json();

//     if (!title || !image) {
//       return new NextResponse("Title and image are required", { status: 400 });
//     }

//     const existingCollection = await Collection.findOne({ title });

//     if (existingCollection) {
//       return new NextResponse("Collection already exists", { status: 400 });
//     }

//     const newCollection = await Collection.create({
//       userId, // Add userId to track ownership
//       title,
//       description,
//       image,
//       createdAt: new Date(),
//     });

//     return NextResponse.json(newCollection, { status: 201 });
//   } catch (err) {
//     console.log("[collections_POST]", err);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// };

// export const GET = async (req: NextRequest) => {
//   try {
//     await connectToDB();
//     const collections = await Collection.find().sort({ createdAt: -1 });
//     return NextResponse.json(collections, { status: 200 });
//   } catch (err) {
//     console.log("[collections_GET]", err);
//     return new NextResponse("Internal Server Error", { status: 500 });
//   }
// }

// export const dynamic = "force-dynamic";
import { NextRequest, NextResponse} from "next/server";
import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    // Connect to MongoDB with error handling
    try {
      await connectToDB();
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      return new NextResponse("Database connection failed", { status: 500 });
    }

    // Parse request body with error handling
    let body;
    try {
      body = await req.json();
    } catch (error) {
      console.error("Failed to parse request body:", error);
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { title, description, image } = body;

    // Check for existing collection
    const existingCollection = await Collection.findOne({ title });

    if (existingCollection) {
      return new NextResponse("Collection already exists", { status: 400 });
    }

    if (!title || !image) {
        return new NextResponse("Title and image are required", { status: 400 });
      }

    // Create new collection with error handling
    try {
      const newCollection = await Collection.create({
        title,
        description,
        image,
      });

      await newCollection.save()

      return NextResponse.json(newCollection, { status: 201 });
    } catch (error) {
      console.error("Failed to create collection:", error);
      return new NextResponse("Failed to create collection", { status: 500 });
    }
  } catch (err) {
    console.error("[collections_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();
    const collections = await Collection.find().sort({ createdAt: -1 });
    return NextResponse.json(collections, { status: 200 });
  } catch (err) {
    console.error("[collections_GET]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export const dynamic = "force-dynamic";