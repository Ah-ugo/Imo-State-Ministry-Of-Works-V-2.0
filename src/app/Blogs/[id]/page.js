import React from "react";
import BlogDetail from "./Details";
import Head from "next/head";
import axios from "axios";

export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const id = params.id;
  console.log(id + "jjjhss");

  // fetch data

  const fetchBlog = async () => {
    const url = `https://parseapi.back4app.com/classes/BlogPost/${id}`;
    const response = await axios.get(url, {
      headers: {
        "X-Parse-Application-Id": process.env.NEXT_PUBLIC_APP_ID,
        "X-Parse-REST-API-Key": process.env.NEXT_PUBLIC_REST_KEY,
      },
    });
    const blogData = response.data;

    // Log the blogData.title property
    console.log(blogData.title + "uuuuu");

    return blogData;
  };

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return fetchBlog().then((blogData) => {
    return {
      link: [
        {
          rel: "icon",
          href: blogData.image1 && blogData.image1.url,
        },
      ],
      title: blogData.title,
      description: blogData.content,
      keywords: `blog, post, imo state, imo, ministry of works, latest news, nigerian, ralph nwosu, ahuekwe prince, ahuekwe prince ugochukwu, commissioner of works, hope uzodinmma, ${blogData.title}, ${blogData.content}, ${blogData.paragraph1}`,
      author: "Ahuekwe Prince, Imo State Ministry Of Works",
      openGraph: {
        type: "article",
        title: blogData.title,
        description: blogData.content,
        image: blogData.image1 && blogData.image1.url,
        // url: blogData.url,
      },
      twitter: {
        card: blogData.image1 && blogData.image1.url,
        title: blogData.title,
        description: blogData.content,
        image: blogData.image1 && blogData.image1.url,
        // site: "@yourTwitterHandle",
      },
      favicon: "../../../../public/imo-logo2.jpg",
    };
  });
}

export default function page({ params }) {
  const fetchBlog = async () => {
    const url = `https://parseapi.back4app.com/classes/BlogPost/${params.id}`;
    const response = await axios.get(url, {
      headers: {
        "X-Parse-Application-Id": "csobjLY2bE8OHm3T1bz4djAMkGArnKzSN3BzTH2m",
        "X-Parse-REST-API-Key": "niuUZnbamAMOAisu3z9ntfWeJZTbKUaRzAggmlGA",
      },
    });
    const blogData = response.data;

    // Log the blogData.title property
    console.log(blogData.title + "sndndnj");

    return blogData;
  };

  return fetchBlog().then((blogData) => {
    // Render the page with the blog data
    console.log(blogData.title + "nnnnnn");
    return (
      <div>
        <Head>
          <meta property="og:title" content={blogData.title} />
          <meta
            property="og:image"
            content={blogData.image1 && blogData.image1.url}
          />
        </Head>
        <BlogDetail params={params} />
      </div>
    );
  });
}
