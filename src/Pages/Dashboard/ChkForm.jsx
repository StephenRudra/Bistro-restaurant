import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js';
import { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../Providers/AuthProvider';

const ChkForm = ({ cart, price}) =>{
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('')
    const [axiosSecure] = useAxiosSecure()
    const [clientSecret, setClientSecret] = useState('');
    const {user} = useContext(AuthContext);
    const [processing, setProcessing] = useState(false)

    
    useEffect(() =>{
     //console.log(price)
      if (price > 0) {
        axiosSecure.post('/create-payment-intent', {price})
      .then(res => {
console.log(res.data.clientSecret)
setClientSecret(res.data.clientSecret)
      })
      }
    }, [price])
    const handleSubmit = async (event) =>{
        event.preventDefault();

        if(!stripe || !elements){
            return
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return
        }
        const {error, paymentMethod} = await stripe.createPaymentMethod({
          type: 'card',
          card
        })
        if(error){
          console.log(error)
          setCardError(error.message)
        }
        else{
          setCardError('')
          //console.log(paymentMethod)

        }
        setProcessing(true)

        const {paymentIntent, error: confirmError} =await stripe.confirmCardPayment
        (
          clientSecret,
          {
            payment_method: {
              card: card,
              billing_details: {
                name: user?.displayName || 'unkown',
                email: user?.email || 'unknown'
              },
            },
          },
        );
        if(confirmError){
          console.log(confirmError)
        }
        console.log(paymentIntent)
        setProcessing(false)
        if(paymentIntent.status === 'suceeded')
        {
          const transId = paymentIntent.id;
          const payment ={
            email: user?.email,
            transId,
            price,
            quantity: cart.length,
            items: cart.map(item => item._id),
            names: cart.map(item => item.name)
          }
          axiosSecure.post('/payments', payment)
          .then(res => {
            console.log(res.data);
            if(res.data.insertedId){
              alert('Inserted in Database')
            }
          })
        }
    }
    return(
        
<>
<form className='w-2/3 m-8' onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#9e2146',
              },
            },
          }}
        />
        <button className='btn btn-outline btn-primary btn-sm mt-4' type="submit" disabled={!stripe || !clientSecret || processing}>
          Pay
        </button>
      </form>
        {cardError && <p className='text-red-600 ml-8'>{cardError}</p>}
        </>
    )

};

export default ChkForm;