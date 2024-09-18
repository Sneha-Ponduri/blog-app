// import BlogOverview from "@/components/blog-overview";
// import React, { useContext } from 'react';


// async function fetchListOfBlogs() {
//   try {
//     const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
//       method: "GET",
//       cache: "no-store",
//     });

//     const result = await apiResponse.json();

//     return result?.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// async function Blogs() {
//   const blogList = await fetchListOfBlogs();

//   console.log(blogList, "blogList");

//   return <BlogOverview blogList={blogList} />;
// }

// export default Blogs;
'use client';
import BlogOverview from "@/components/blog-overview";
import React, { useEffect, useState } from 'react';

// This function fetches the blogs
async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store", // Prevent caching
    });

    const result = await apiResponse.json();
    return result?.data; // Return the blog data
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array on failure
  }
}

// Client-side component
export default function Blogs() {
  const [blogList, setBlogList] = useState([]);

  // Fetch blogs on component mount
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await fetchListOfBlogs();
      setBlogList(blogs); // Update the state with the fetched blog list
    }
    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  return <BlogOverview blogList={blogList} />;
}
