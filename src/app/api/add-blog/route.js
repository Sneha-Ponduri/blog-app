// import connectToDB from "@/database";
// import Blog from "@/models/blog";
// import Joi from "joi";
// import { NextResponse } from "next/server";
// import React, { useContext } from 'react';


// const AddNewBlog = Joi.object({
//   title: Joi.string().required(),
//   description: Joi.string().required(),
// });

// export async function POST(req) {
//   try {
//     await connectToDB();

//     const extractBlogData = await req.json();
//     const { title, description } = extractBlogData;

//     const { error } = AddNewBlog.validate({
//       title,
//       description,
//     });

//     if (error) {
//       return NextResponse.json({
//         success: false,
//         message: error.details[0].message,
//       });
//     }

//     const newlyCreatedBlogItem = await Blog.create(extractBlogData);
//     if (newlyCreatedBlogItem) {
//       return NextResponse.json({
//         success: true,
//         message: "Blog added successfully",
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
import BlogOverview from "@/components/blog-overview";
import React, { useEffect, useState } from 'react';

// Function to fetch blogs from the API
async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("/api/get-blogs", {
      method: "GET",
      cache: "no-store", // Prevent caching
    });
    const result = await apiResponse.json();
    return result?.data || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Function to add a new blog
async function addNewBlog(blogData) {
  try {
    const response = await fetch("/api/add-blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blogData),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error adding new blog:", error);
    return { success: false, message: "Failed to add new blog" };
  }
}

export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", description: "" });

  // Fetch blogs on component mount
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await fetchListOfBlogs();
      setBlogList(blogs); // Update state with fetched blog list
    }
    fetchBlogs();
  }, []);

  // Function to handle blog submission
  const handleAddBlog = async (e) => {
    e.preventDefault();
    const result = await addNewBlog(newBlog);

    if (result.success) {
      // Refetch blogs after successfully adding a new blog
      const blogs = await fetchListOfBlogs();
      setBlogList(blogs); // Update blog list
      setNewBlog({ title: "", description: "" }); // Clear the form
    } else {
      console.error(result.message);
    }
  };

  return (
    <>
      <BlogOverview blogList={blogList} />
      {/* Form to add a new blog */}
      <form onSubmit={handleAddBlog}>
        <input
          type="text"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          placeholder="Blog Title"
          required
        />
        <textarea
          value={newBlog.description}
          onChange={(e) => setNewBlog({ ...newBlog, description: e.target.value })}
          placeholder="Blog Description"
          required
        />
        <button type="submit">Add Blog</button>
      </form>
    </>
  );
}
