// import Image from "next/image";
import './checkout.css'
import  CheckoutForm from '../components/checkoutConponent/FormConponent'
import ProductCheckoutConponent from '../components/checkoutConponent/productCart'
export default function Checkout() {
  return (
            <div className="profile-body">
               <div className="product-nav">
                  <h4 className="font-Inter">Home / pages / checkout</h4>
                </div>


                <div className='checkout-section'>
                    <h3>Checkout</h3>
                    <div className='check-returning-copon'>
                        <div className='check-returning'>
                            <h2> Returning customer? <a> Click here to log in</a></h2>
                        </div>
                        <div className='check-returning'>
                            <h2>  Have a coupon? <a>Click here to enter your code</a> </h2>
                        </div>
                    </div>
                

                    <div className='check-Billing'>
                      <h4>Billing Detail</h4>
                      <div className='check-form-Order'>
                          
                                  <CheckoutForm />
                                 
                                 <ProductCheckoutConponent />
                           
                        </div>
                    </div>


                </div>

            
           </div>
     );
}
