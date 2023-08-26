import SectionTitle from '../../Components/SectionTitle/SectionTitle'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import ChkForm from '../Dashboard/ChkForm'
const stripePromise = loadStripe(import.meta.env.VITE_Payment);
import useCart from '../../Hooks/useCart'
const Payment = ()=>{
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))
    return(
        <div>
            <SectionTitle subHeading='please provide' heading='Payment'></SectionTitle>
            
            <Elements stripe={stripePromise}>
                <ChkForm price={price} cart={cart}></ChkForm>
            </Elements>
        </div>
    );
};

export default Payment;