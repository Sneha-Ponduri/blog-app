// import connectToDB from "@/database";
// import Blog from "@/models/blog";
// import { NextResponse } from "next/server";
// import React, { useContext } from 'react';

// export async function DELETE(req) {
//   try {
//     await connectToDB();
//     const { searchParams } = new URL(req.url);
//     const getCurrentBlogID = searchParams.get("id");

//     if (!getCurrentBlogID) {
//       return NextResponse.json({
//         success: false,
//         message: "Blog ID is required",
//       });
//     }

//     const deleteCurrentBlogByID = await Blog.findByIdAndDelete(
//       getCurrentBlogID
//     );
//     if (deleteCurrentBlogByID) {
//       return NextResponse.json({
//         success: true,
//         message: "Blog is deleted successfully",
//       });
//     }
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong! Please try again",
//     });
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong! Please try again",
//     });
//   }
// }
// Backend: /src/app/api/delete-blog/route.js
import connectToDB from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  try {
    await connectToDB();

    // Get the blog ID from the request URL query parameters
    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    // Find and delete the blog by its ID
    const deleteCurrentBlogByID = await Blog.findByIdAndDelete(getCurrentBlogID);

    if (deleteCurrentBlogByID) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not found or could not be deleted.",
      });
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred. Please try again.",
    });
  }
}
