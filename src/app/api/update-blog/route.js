// import connectToDB from "@/database";
// import Blog from "@/models/blog";
// import Joi from "joi";
// import { NextResponse } from "next/server";
// import React, { useContext } from 'react';


// const EditBlog = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string().required(),
// });

// export async function PUT(req) {
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

//     const { title, description } = await req.json();
//     const { error } = EditBlog.validate({
//       title,
//       description,
//     });

//     if (error) {
//       return NextResponse.json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }

//     const updateBlogByBlogID = await Blog.findOneAndUpdate(
//       {
//         _id: getCurrentBlogID,
//       },
//       { title, description },
//       { new: true }
//     );

//     if (updateBlogByBlogID) {
//       return NextResponse.json({
//         success: true,
//         message: "Blog is updated successfully",
//       });
//     } else {
//       return NextResponse.json({
//         success: false,
//         message: "Something went wrong ! Please try again",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({
//       success: false,
//       message: "Something went wrong ! Please try again",
//     });
//   }
// }
// Backend: /src/app/api/edit-blog/route.js
import connectToDB from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const EditBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectToDB();

    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog ID is required",
      });
    }

    // Parse the request body
    const { title, description } = await req.json();

    // Validate the title and description using Joi schema
    const { error } = EditBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Find the blog by ID and update it with new data
    const updateBlogByBlogID = await Blog.findOneAndUpdate(
      { _id: getCurrentBlogID }, // Search condition
      { title, description },    // Fields to update
      { new: true }              // Return the updated document
    );

    if (updateBlogByBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is updated successfully",
        data: updateBlogByBlogID, // Send the updated blog data in the response
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "Blog not found or update failed",
      });
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json({
      success: false,
      message: "An error occurred while updating the blog. Please try again.",
    });
  }
}
