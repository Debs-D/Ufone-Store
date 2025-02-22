import Image from "next/image";
import { Metadata } from "next";
import "./productId.css";
import ProductDetail from "../../../components/products/productDetail";

type ImageData = {
  original: string;
  thumbnail: string;
};

var ArrayDATA: ImageData[] = [];

async function getProduct(id: string) {
  ArrayDATA = [];
  const apiUrl = process.env.REACT_APP_FETCH_PRODUCT + `/${id}`;

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

    const data = await res.json();

    for (const img of data.images) {
      const newData: ImageData = {
        original: img.url,
        thumbnail: img.url,
      };
      ArrayDATA.push(newData);
    }

    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null; // Return null to handle failure gracefully
  }
}

export default async function ProductId({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="error">
        <h2>Failed to load product. Please try again later.</h2>
      </div>
    );
  }

  return (
    <div className="product-center">
      <div className="product-banner">
        <div className="product-nav">
          <h4 className="font-Inter">Home / Shop / Products</h4>
        </div>
        <ProductDetail product={product} images={ArrayDATA} />
      </div>
    </div>
  );
}

//    async function getCategoryDatail(id: string) {
//      const res = await fetch(`${URL_EXAM_END}/single/categories/${id}`);
//      const data = await res.json();
//      return data.data;
//    }

// export async function generateMetadata({
//      params,
//    }: {
//      params: { id: string };
//    }): Promise<Metadata> {
//      const product = await getProduct(params.id);
//      // console.log('log ----2020-----> data',product.titleCut)
//      return {
//        title: product.title,
//        description: product.titleCut,
//        icons: {
//          icon: '/icon.png',
//          shortcut: '/shortcut-icon.png'
//          apple: '/apple-icon.png',
//          other: {
//            rel: 'https://res.cloudinary.com/codepally/image/upload/v1665659075/UFUON%20LOGO%20PNG/ufuon_logo_2_alt9px.png',
//            url: 'https://res.cloudinary.com/codepally/image/upload/v1665659075/UFUON%20LOGO%20PNG/ufuon_logo_2_alt9px.png',
//          },
//        },
//        openGraph: {
//          title: product.title,
//          description: product.titleCut,
//          images: [
//            {
//              url: product.url,
//            },
//          ],
//        },
//      };
//    }
