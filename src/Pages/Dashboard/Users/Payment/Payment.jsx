import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";;
import CheckoutForm from "./CheckOutForm";
import { Helmet } from "react-helmet-async";
import useBookings from "../../../../hooks/useBookings";


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const Payment = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[3]
    // console.log(id);
    const [hotels, refetch] = useBookings();
    const SingleHotel = hotels.find(item => item._id === id);
    // console.log(SingleHotel);
    const PriceInitial = SingleHotel?.price;
    const Price = parseFloat(PriceInitial?.toFixed(2))

    const handlePay = (SingleHotel) => {
        fetch(`https://happy-to-trip-server.vercel.app/bookings/${SingleHotel._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            
                        }
                    })
    }
    const handleUpdate = (SingleHotel) => {
        fetch(`https://happy-to-trip-server.vercel.app/bookings/${SingleHotel.SelectedId}`, {
                    method: 'PATCH'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.modifiedCount > 0) {
                            
                        }
                    })
    }
    return (
        <div className="mx-10 w-10/12">
            <Helmet>
                <title>TravelEase | Payment</title>
            </Helmet>
            <h2 className="text-3xl font-semibold py-5"> Pay Bill To Confirm Your Hotel!</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm cart={SingleHotel} handlePay= { () => handlePay(SingleHotel)} handleUpdate= { () => handleUpdate(SingleHotel)}  price={Price}></CheckoutForm>
            </Elements>
        </div>
    );
};

export default Payment;