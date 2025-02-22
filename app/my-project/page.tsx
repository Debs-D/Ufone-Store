import Collection from '../components/projectConponent/projectCollection'

export default function Project() {
  return (
        <div className="font-sans bg-white">

                   <div className="p-4 lg:max-w-7xl max-w-4xl mx-auto">
                      <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 p-6 rounded">
                         <div className="lg:col-span-4 w-full lg:sticky top-0 text-center">
                          
                             <Collection />
                          
                      
                         </div>
                         <div className="xl:col-span-1 w-full project-detail">
                         <div style={{background:'red'}}>
                         <div>
                              <div className="home-right-banner">
                                     <img src="https://res.cloudinary.com/codepally/image/upload/v1734638009/div.img_eqrqli.png" alt=""   />
                              
                              </div>
                              <div  className="home-right-banner">
                                    <img src="https://res.cloudinary.com/codepally/image/upload/v1734638009/slider6.png_khqpjz.png" alt=""  />
                              </div>
                          </div>
                              </div>
                           </div>
                      </div>
                   </div>
        </div>
  );
}
