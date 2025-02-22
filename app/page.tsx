//import Image from "next/image";
import SlideShow from "./components/headslide/slide";
// import slider6 from "../public/slider6.png.png";
// import { Card, CardActionArea, CardActions, Rating, CardContent, Typography } from '@mui/material';
//import div1 from "../public/div.img.png";
import ProductCard from "./components/products/product";
import CategorySide from "./components/categoies/categories";
import SectionCard from "./components/section/sectionCard";
import "./page.css";

// let authToken =  window.localStorage.getItem('Authorization')

async function fetchProducts() {
  const res = await fetch(
    "https://ufuon-store.vercel.app/api/product/fetchproduct"
  );
  // next: { revalidate: 10 }
  const data = await res.json();
  console.log("show----article---------------------data>", data);
  return data;
}

async function getCategoires() {
  const res = await fetch("https://ufuon-store.vercel.app/api/categories");
  const data = await res.json();
  return data.data;
}

async function getSections() {
  const res = await fetch("https://ufuon-store.vercel.app/api/sections/public");
  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const products = await fetchProducts();
  const categories = await getCategoires();
  const sections = await getSections();

  return (
    <div>
      <div className="items-center">
        <div className="home-banner">
          {<CategorySide categories={categories} />}

          {
            //  console.log("-------sections-------->", sections)
          }
          <div className="home-banner-right">
            <div className="home-slide-right">
              <div className="home-slide">
                <SlideShow />
              </div>
              <div>
                <div className="home-right-banner">
                  <img
                    src="https://res.cloudinary.com/codepally/image/upload/v1734638009/div.img_eqrqli.png"
                    alt=""
                  />
                </div>
                <div className="home-right-banner">
                  <img
                    src="https://res.cloudinary.com/codepally/image/upload/v1734638009/slider6.png_khqpjz.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              {
                //    <div className="cardbox home-featured">
                //      <div  className="home-featured-title">
                //          <p className="font-Inter">View All </p>
                //          <h2 className="font-Inter">featured brands</h2>
                //      </div>
                //      <div className="home-featured-img">
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734697308/Link_logo4.png_vrbkfm.png" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734697308/Link_logo5.png_xwy6cl.png" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734697309/logo_acuctp_1_elhkur.svg" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734697308/Link_logo4.png_vrbkfm.png" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734697308/Link_logo5.png_xwy6cl.png" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734698883/Link_logo10.png_1_paabfe.png" alt="image"/>
                //          <img src="https://res.cloudinary.com/codepally/image/upload/v1734698883/Link_logo8.png_bc8nml.png" alt="image"/>
                //      </div>
                //    </div>
              }
              {
                //  <div className="cardbox home-calegory">
                //    <div  className="home-featured-title">
                //        <p className="font-Inter">View All </p>
                //        <h2 className="font-Inter">top categories</h2>
                //    </div>
                //    <div className="home-calegory-img">
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703936/4_Link_prod4.png_gmlico.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703923/4_Link_prod1.png_indkfz.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703936/4_Link_prod4.png_gmlico.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703923/4_Link_prod1.png_indkfz.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703936/4_Link_prod4.png_gmlico.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //      <div className="cardbox home-calegory-sub">
                //              <img src="https://res.cloudinary.com/codepally/image/upload/v1734703923/4_Link_prod1.png_indkfz.png" alt="image"/>
                //              <p className="font-Inter">Laptops</p>
                //      </div>
                //    </div>
                //  </div>
              }
            </div>
          </div>
        </div>

        <div className="home-Deals-day">
          <div className="home-Deals-product">
            <div className="home-Deals-nave">
              <p className="font-Inter">View All </p>
              <h2 className="font-Inter">featured brands</h2>
            </div>
            <div className="grid grid-cols-2">
              <div className="home-Deals-img">
                <img
                  src="https://res.cloudinary.com/codepally/image/upload/v1734707889/prod5.png_siiksq.png"
                  alt="image"
                />
              </div>
              <div className="home-Deals-detail">
                <h3>Xioma Redmi Note 11 Pro 256GB 2023, Black Smartphone</h3>
                <h4>
                  $569.00 <small>759.00</small>
                </h4>
                <ul>
                  <li>
                    {" "}
                    Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
                  </li>
                  <li>
                    {" "}
                    Intel LGA 1700 Socket: Supports 13th & 12th Gen Intel Core
                  </li>
                </ul>

                <button
                  type="button"
                  className="px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  FREE SHIPPING
                </button>

                <button
                  type="button"
                  className="px-3 py-2 ml-5 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  FREE GIFT
                </button>

                <div>free gift</div>
                <p> Commanding Power Design: Twin 16+1+2 Phases Digital VRM </p>
              </div>
            </div>
          </div>
          <div className="home-Deals-left">
            <img
              src="https://res.cloudinary.com/codepally/image/upload/v1734732026/Main_Section_Link_ban2.png_efxhzb.png"
              alt="img"
            />
            <img
              src="https://res.cloudinary.com/codepally/image/upload/v1734732021/Main_Section_Link_ban1.png_jtcgul.png"
              alt="img"
            />
          </div>
        </div>

        <div className="home-boxs home-products">
          <h3>Products</h3>

          <div className="home-products-sub">
            {products?.map((item: any, index: any) => (
              <ProductCard key={index} product={item} />
            ))}
          </div>
        </div>

        <div className="cardbox home-easy">
          <h3>Easy project to start eletronic</h3>

          <div className="home-easy-sub">
            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>

            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>

            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>

            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>

            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>

            <div className="project">
              <img
                src="https://res.cloudinary.com/codepally/image/upload/v1734800197/prod16.jpg_zydaqq.png"
                alt="img"
              />
              <div className="products-detail">
                <h3 className="font-Inter">
                  SORE Simply Brew Compact Filter Drip Coffee Maker
                </h3>

                <h4>
                  $1,259.00 <small>$1,469.00</small>
                </h4>

                <button
                  type="button"
                  className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Start now
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-project">
          <h3>Learning project</h3>
          <div className="home-project-sub">
            {sections?.map((item: any, index: any) => (
              <SectionCard key={index} section={item} />
            ))}
          </div>
        </div>

        <div className="Home-footer-banner">
          <div className="Home-footer-sub">
            <img
              src="https://res.cloudinary.com/codepally/image/upload/v1734868454/banner2.png_pra0da.png"
              alt="img"
            />
          </div>
          <div className="Home-footer-sub">
            <img
              src="https://res.cloudinary.com/codepally/image/upload/v1734868441/Main_Section_xs7dpt.png"
              alt="img"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
