import { Elements } from '@stripe/react-stripe-js';
import './strip.css';
import StripePaymentElement from './stripePaymentElement';
import { useSelector } from 'react-redux';

const StripeCheckoutForm = () => {
    const clientSecretSettings = useSelector((state: any) => state.clientSecretSettings);
    const stripePromise = useSelector((state: any) => state.stripePromise);
    
    return (
        <>
            {!clientSecretSettings.loading && (
            <Elements
                key={clientSecretSettings.clientSecret} // Add a unique key to force re-render
                stripe={stripePromise}
                options={{
                    clientSecret: clientSecretSettings.clientSecret,
                    appearance: {
                        theme: "stripe", 
                        // variables: {
                        //     colorPrimary: '#0570de',
                        //     colorBackground: '#ffffff',
                        //     colorText: '#30313d',
                        //     borderRadius: '4px',
                        //     fontFamily: 'Ideal Sans, system-ui, sans-serif',
                        // },
                    }
                }}>
                <StripePaymentElement />
            </Elements>
            )}
        </>
    )
};

export default StripeCheckoutForm;
