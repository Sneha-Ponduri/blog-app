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
// 'use client';
// import BlogOverview from "@/components/blog-overview";
// import React, { useEffect, useState } from 'react';

// // This function fetches the blogs
// async function fetchListOfBlogs() {
//   try {
//     const apiResponse = await fetch("/api/get-blogs", {
//       method: "GET",
//       cache: "no-store", // Prevent caching
//     });

//     const result = await apiResponse.json();
//     return result?.data; // Return the blog data
//   } catch (error) {
//     console.error("Error fetching blogs:", error);
//     return []; // Return an empty array on failure
//   }
// }

// // Client-side component
// export default function Blogs() {
//   const [blogList, setBlogList] = useState([]);

//   // Fetch blogs on component mount
//   useEffect(() => {
//     async function fetchBlogs() {
//       const blogs = await fetchListOfBlogs();
//       setBlogList(blogs); // Update the state with the fetched blog list
//     }
//     fetchBlogs();
//   }, []); // Empty dependency array ensures this runs only once after the initial render

//   return <BlogOverview blogList={blogList} />;
// }
'use client';
import BlogOverview from "@/components/blog-overview";
import React, { useEffect, useState } from 'react';

// This function fetches the blogs
async function fetchListOfBlogs() {
  try {
    const apiResponse = await fetch("/api/get-blogs", {
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

// This function deletes a blog by its ID
async function deleteBlog(blogId) {
  try {
    const response = await fetch(`/api/delete-blog?id=${blogId}`, {
      method: "DELETE",
    });

    const result = await response.json();

    if (result.success) {
      return true;
    } else {
      console.error(result.message);
      return false;
    }
  } catch (error) {
    console.error("Error deleting blog:", error);
    return false;
  }
}

// Client-side component
export default function Blogs() {
  const [blogList, setBlogList] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch blogs on component mount
  useEffect(() => {
    async function fetchBlogs() {
      const blogs = await fetchListOfBlogs();
      setBlogList(blogs); // Update the state with the fetched blog list
    }
    fetchBlogs();
  }, []); // Empty dependency array ensures this runs only once after the initial render

  // Handle the blog deletion
  const handleDeleteBlog = async (blogId) => {
    const isDeleted = await deleteBlog(blogId);

    if (isDeleted) {
      setMessage("Blog deleted successfully.");
      // Remove the deleted blog from the list without reloading the page
      setBlogList((prevBlogList) => prevBlogList.filter((blog) => blog._id !== blogId));
    } else {
      setMessage("Failed to delete the blog.");
    }
  };

  return (
    <div>
      <h1>Blogs</h1>
      {message && <p>{message}</p>}
      {blogList.length > 0 ? (
        <BlogOverview blogList={blogList} onDelete={handleDeleteBlog} />
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}
