"use client";
import { Slide } from 'react-slideshow-image';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
// import MarkdownPreview from "./headslide";
import  ImagesIndex from "./image.js"
// import { Database } from "@/lib/types/supabase";
// import { createBrowserClient } from "@supabase/ssr";
import React, { useEffect, useState, useTransition } from "react";
// import { BlogContentLoading } from "./Skeleton";
// import Checkout from "@/components/stripe/Checkout";

export default function SlideShow() {
	const [loading, setLoading] = useState(true);


    const properties= {
        indicators: true,
        prevArrow: <div style={{width: "30px", marginRight: "-30px"}}>👉</div>,
        nextArrow: <div style={{width: "30px", marginLeft: "-30px"}}>👈</div>,
        indicators: i => (<div className="indicator">{}</div>),
        scale: 0.4,
      }

	// const [blog, setBlog] = useState<{
	// 	blog_id: string;
	// 	content: string;
	// 	created_at: string;
	// } | null>();

	// const supabase = createBrowserClient<Database>(
	// 	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	// 	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	// );

	// const readBlogContent = async () => {
	// 	const { data } = await supabase
	// 		.from("blog_content")
	// 		.select("*")
	// 		.eq("blog_id", blogId)
	// 		.single();
	// 	setBlog(data);
	// 	setLoading(false);
	// };

	useEffect(() => {
		// console.log('------------blogId------------->',blogId)
		// eslint-disable-next-line
	}, []);

	// if (loading) {
	// 	return <BlogContentLoading />;
	// }

	// if (!blog?.content) {
	// 	return <Checkout />;
	// }

	return (

        <Slide {...properties} autoplay={true}>
                        {ImagesIndex.map(item =>
                              <div key={item.id} className="home-slide-sub">
                                  <div className="home-slide-img"> 
                                    <p> <img src={item.src} /> </p>
                                  </div>
                                
                                  
                        </div>)}
                  </Slide>
    )
}
