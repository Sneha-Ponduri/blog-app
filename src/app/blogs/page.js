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
      cache: "no-store", // You can replace this with a cache or revalidate option as needed
    });

    const result = await apiResponse.json();

    return result?.data;
  } catch (error) {
    throw new Error(error);
  }
}

// Use getServerSideProps to fetch the data at request time
export async function getServerSideProps() {
  const blogList = await fetchListOfBlogs();
  return {
    props: { blogList }, // Pass blogList as a prop to the page
  };
}

function Blogs({ blogList }) {
  return <BlogOverview blogList={blogList} />;
}

export default Blogs;
