import axios from 'axios';
import React from 'react';
import { useElements, useStripe , PaymentElement } from '@stripe/react-stripe-js';
import { toast } from 'react-toastify';
import './strip.css';
import { useDispatch, useSelector } from 'react-redux';
import PDFGenerate from '../pdfGeneration/pdfGenerate';
import { getClientSecretSettings } from '../../redux/actions/action';

const StripePaymentElement = () => {
    const userData = useSelector((state:any)=>state.userData)
    const formData = useSelector((state:any)=>state.formData)
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const clientSecretSettings = useSelector((state: any) => state.clientSecretSettings);

    // const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmPayment({
            elements,
            confirmParams: {
            // Prevent redirect by not specifying a return_url
            },
            redirect: 'if_required', // Ensures no automatic redirection
        });

        if (result.error) {
            toast.error(result.error.message ?? 'An unknown error occurred.');
        } else if ('paymentIntent' in result && (result.paymentIntent as { status: string })?.status === 'succeeded') {
            const paymentDetails = result.paymentIntent;
            console.log('Payment result:', result);
            console.log('Payment Details:', paymentDetails);

            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            var paymentData = {
                paymentId: paymentDetails.id,
                status: "Success",
                userId: userData.userId,
            };
            const puRes = await axios.post(serviceUrl + "/updateTransaction", paymentData);
            console.log(puRes.data);


            // const formData = JSON.parse(localStorage.getItem('formData') || '{}');
            const submittedYears = Object.keys(formData)
                .filter(key => key.startsWith('wantToFile') && formData[key] === 'yes')
                .map(key => key.replace('wantToFile', ''));

            console.log(submittedYears);

            var orderData = {
                paymentId: paymentDetails.id,
                status: "Under Review",
                paymentStatus: paymentDetails.status,
                userId: userData.userId,
                form: '8843',
                submittedYear: submittedYears,
                noOfDaysUSA: formData.noOfDaysUSA,
            };
            await createOrder(orderData);

            // PDFGenerate();
            
            

            // // Fetch all necessary payment details
            // const { id, amount, currency, created, status, payment_method, livemode, client_secret } = paymentDetails;

            // // Convert 'created' timestamp to readable date and time
            // const createdDate = new Date(created * 1000); // Stripe timestamps are in seconds
            // const formattedDate = createdDate.toISOString();

            // // Decode payment_method if it's an object
            // const decodedPaymentMethod = typeof payment_method === 'object' ? JSON.stringify(payment_method) : payment_method;

            // console.log('Formatted Date:', formattedDate);
            // console.log('Decoded Payment Method:', decodedPaymentMethod);

            // // Log or store payment details
            // console.log('Payment Details:', { id, amount, currency, created, status, payment_method });

            // toast.success('Payment successful!');
        } else {
            toast.info('Payment requires additional action or redirection.');
        }
    };

    const handleCancel = async (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(formData);
        event.preventDefault();

        console.log('Payment cancelled');

        if (!stripe || !elements) {
            return;
        }

        try {
            const result = await stripe.retrievePaymentIntent(clientSecretSettings.clientSecret);
            console.log('Payment Intent:', result);

            
            // Optionally, you can reset the payment element or handle UI state
            // Reset the payment element
            if (elements) {
                elements.getElement(PaymentElement)?.destroy();
                document.getElementById('stripeSection')!.style.display = 'none';
                // document.querySelector('.stripeSection')?.remove();
            }

            const paymentDetails = result.paymentIntent;
            if(!paymentDetails) {
                toast.error('No payment details found.');
                return;
            }
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            var paymentData = {
                paymentId: paymentDetails.id,
                status: "Cancelled",
                userId: userData.userId,
            };
            const puRes = await axios.post(serviceUrl + "/updateTransaction", paymentData);
            console.log(puRes.data);


            // const formData = JSON.parse(localStorage.getItem('formData') || '{}');
            const submittedYears = Object.keys(formData)
                .filter(key => key.startsWith('wantToFile') && formData[key] === 'yes')
                .map(key => key.replace('wantToFile', ''));

            console.log(submittedYears);

            var orderData = {
                paymentId: paymentDetails.id,
                status: "Cancelled",
                paymentStatus: "Cancelled",
                userId: userData.userId,
                form: '8843',
                submittedYear: submittedYears,
            };
            await createOrder(orderData);

            if (result.paymentIntent?.status === 'requires_payment_method') {
                toast.info('Payment has already been canceled');
            } else {
                toast.success('Payment canceled successfully.');
            }

            // dispatch(getClientSecretSettings({clientSecret: "", loading: true}));
        }catch(error) {
            console.error('Error canceling payment:', error);
            toast.error('An error occurred while attempting to cancel the payment.');
        }
    };

    const createOrder = async (data: any) => {
        try {
            const serviceUrl = import.meta.env.VITE_SERVICE_URL;
            const coRes = await axios.post(serviceUrl + "/createOrder", data);
            console.log(coRes.data);
        }
        catch (error) {
            toast.error('An error occurred while attempting to update the order.');
        }
    }

    

    return (
        <>
            <section className='stripeSection' id='stripeSection'>
                <div className='stripeContainer'>
                    {/* <p className='price'><span id="currency">USD</span> <span id="amount">99</span> </p> */}
                    <form onSubmit={(e) => e.preventDefault()}>
                        <PaymentElement />
                        <button disabled={!stripe} onClick={(e) => { e.preventDefault(); handleCancel(e); }} className='btnLtePrimary mt-3'>Cancel</button>
                        <button disabled={!stripe} onClick={(e) => { e.preventDefault(); handleSubmit(e); }} className='btnPrimary mt-3 float-end'>Submit</button>
                        {/* {errorMessage && <p className='paymentError'>{errorMessage}</p>} */}
                    </form>
                </div>
            </section>
        </>
    )
};

export default StripePaymentElement;
