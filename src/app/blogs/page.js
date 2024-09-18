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
import BlogOverview from "@/components/blog-overview";
import React from 'react';

// This function fetches the blogs
async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("http://localhost:3000/api/get-blogs", {
      method: "GET",
      cache: "no-store", // To avoid caching, or you can use 'force-cache' or 'revalidate' if needed
    });

    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return []; // Return an empty array if the fetch fails to avoid breaking the app
  }
}

// Server Component
export default async function Blogs() {
  const blogList = await fetchListOfBlogs();

  return <BlogOverview blogList={blogList} />;
}
