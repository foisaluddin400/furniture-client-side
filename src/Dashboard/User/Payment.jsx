import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckOutForm from "./CheckOutForm"


const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

export default function Payment() {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckOutForm></CheckOutForm>
      </Elements>
    </div>
  )
}
