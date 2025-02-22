import { Metadata } from "next";
import MyProjectCollection from '../../components/projectConponent/myProject/Myproject'
import './projectId.css'

const URL_END = "https://ufuon-store.vercel.app/api";
const URL_LOCAL_END = "http://localhost:43000/api";


var ArrayDATA = []


async function getProjectId(id: string) {
  ArrayDATA = [ ]
 console.log("id--------------->",id)
 const res = await fetch(`${URL_LOCAL_END}/sections/${id}`);
 const data = await res.json();
 console.log('project----------------->',data)
//  for (let i = 0; i < data.images.length; i++) {
//       // console.log('data----------------->',data.images[i].url)
//            const newData ={
//                   original:  data.images[i].url,
//                   thumbnail:  data.images[i].url,
//            }
//           //  setImages([...images, newData])
//     ArrayDATA.push(newData)
//     // console.log('ArrayDATA----------------->',ArrayDATA)
//   }
 return data;
}


async function getCategoires() {
      const res = await fetch(`${process.env.REACT_APP_CATEGORY}`, {
      });
      const data = await res.json();
      return data.data;
      }
      
      async function getSections() {
      const res = await fetch(`${process.env.REACT_APP_SECTIONS}/public`, {
      });
      const data = await res.json();
      return data.data;
      }
      
      
      // export async function generateMetadata({
      //   params,
      // }: {
      //   params: { id: string };
      // }): Promise<Metadata> {
      //   const product = await getProjectId(params.id);
      //   console.log('log ----2020----------------------> data',product.data.title,product.data ,product.data.imageFile.url)
      //   return {
      //     title: product.data.name,
      //     description: product.data.title,
      //     icons: {
      //       icon: '/icon.png',
      //       shortcut: '/shortcut-icon.png',
      //       apple: '/apple-icon.png',
      //       other: {
      //         rel: 'https://res.cloudinary.com/codepally/image/upload/v1665659075/UFUON%20LOGO%20PNG/ufuon_logo_2_alt9px.png',
      //         url:'https://res.cloudinary.com/codepally/image/upload/v1665659075/UFUON%20LOGO%20PNG/ufuon_logo_2_alt9px.png'
      //       },
      //     },
      //     openGraph: {
      //       title: product.data.name,
      //       description: product.data.title,
      //       images: [
      //         {
      //           url: product.data.imageFile.url,
      //         },
      //       ],
      //     },
      //   };
      // }
      
      


export default async function MyProjectId({ params }: { params: { id: string } }) { 

 
      const product = await getProjectId(params.id);
      console.log('product---------product------product.quantity----->',product.data.products, product.data.quantity)
      const getID = params.id

      const formattedData  =  (data:any, array:any) => data.map((obj:any, i:number) => (  
        {
          ...obj,
          quantity: array[i]
        }
      ));
      
      const CountTotal = (data:any)=> {
        // const  quantity = 1
          var totaltAll = data.reduce(function(res:any,item:any) {
            return res + (item.price * item.quantity);
          }, 0);
          // setTotalProduct(totaltAll)
          // console.log(totaltAll);
      
      }
      console.log('product---------formattedData----------->',getID, formattedData(product.data.products, product.data.quantity))
      formattedData(product.data.products, product.data.quantity)
      // CountTotal(formattedData(product.data, product.data.quantity))
    
    

return (

       <div className="product-center">
        <MyProjectCollection section={product.data} id={getID}  products={formattedData(product.data.products, product.data.quantity)} />
       </div>
 );
}
