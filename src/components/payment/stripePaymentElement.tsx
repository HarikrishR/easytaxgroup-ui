import React from 'react';
import { useElements, useStripe , PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import './strip.css';

const StripePaymentElement = () => {

    const stripe = useStripe();
    const elements = useElements();

    // const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        // We don't want to let default form submission happen here,
        // which would refresh the page.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        const { error } = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            confirmParams: {
                return_url: 'http://localhost:4242/success.html',
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            toast.error(error.message ?? 'An unknown error occurred.');
            // setErrorMessage(error.message ?? 'An unknown error occurred.');
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };

    

    return (
        <>
            <div className='stripeContainer'>
                <form onSubmit={handleSubmit}>
                    <PaymentElement />
                    <button disabled={!stripe} className='btnLtePrimary mt-3'>Submit</button>
                    {/* {errorMessage && <p className='paymentError'>{errorMessage}</p>} */}
                </form>
            </div>
    </>
    )
};

export default StripePaymentElement;
