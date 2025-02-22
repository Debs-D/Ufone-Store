// "use client";
import React from "react";

// import { useState, useEffect } from "react";

const SectionCard = (props) => {
// export default function ProductCard(props) {
    // const [count, setCount] = useState(null);
     // const { posts, count } = await getData(page, cat);

     const  moneyFormat =(price, sign = 'N') =>{
      const pieces = parseFloat(price).toFixed(2).split('')
      let ii = pieces.length - 3
      while ((ii-=3) > 0) {
        pieces.splice(ii, 0, ',')
      }
      return sign + pieces.join('')

      
    }

    function ToSeoUrl(url) {
        
      // make the url lowercase         
      var encodedUrl = url.toString().toLowerCase(); 
    
      // replace & with and           
      encodedUrl = encodedUrl.split(/\&+/).join("-and-")
    
      // remove invalid characters 
      encodedUrl = encodedUrl.split(/[^a-z0-9]/).join("-");       
    
      // remove duplicates 
      encodedUrl = encodedUrl.split(/-+/).join("-");
    
      // trim leading & trailing characters 
      encodedUrl = encodedUrl.trim('-'); 
    
      return encodedUrl; 
    }
  
    return (
      props.section === undefined || props.section === null ?
        null
       :
       <div className="cardbox home-project-card">
       <h3 className="font-Inter"> { props.section.name.length > 35 ? props.section.name.slice(0, 35) + '...' : props.section.name}</h3>
            <div className="home-project-card-medi">
            {
                props.section.url === undefined || props.section.url === null ?
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                        <img className="object-cover"  alt={props.section.url} src=""  alt="product image" />
                        <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                    </a>
                :
                <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                    <img className="object-cover"  alt={props.section.url} src={props.section.url}  alt="product image" />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
                </a>
            }
          
            </div>
            
            <h6 className="font-Inter" style={{float:'right',color:"#000"}}> Products {props.section.products.length}</h6>
             <p className="font-Inter">Material for this project</p>
          
             <div className="home-project-detail">
                <div className="circle-project">
                    
                        {  props.section.products?.map((item,index) => (
                            index < 6 ?
                            <div key={index} className="h-[90px] w-[90px] rounded-full bg-gray-200 image-project">
                              { console.log('-------------->',item.images[0].url)  }
                              {
                                item.images.length === 0 ||  item.images === undefined ?
                                <img src="https://res.cloudinary.com/codepally/image/upload/v1734783405/Link_prod5.png_ccsa04.png" alt="img" />
                                :
                                <img src={item.images[0].url} alt="img" />
                              }
                               
                           </div>
                           : 
                           null
                        ))}
                    
                     
                    
                </div>
             </div>
             <a  href={`/projects/${ToSeoUrl(props.section.name.slice(0, 35))}/${props.section._id}`}   type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                   Start now
             </a>
        </div>

         
      );


}

export default SectionCard;
