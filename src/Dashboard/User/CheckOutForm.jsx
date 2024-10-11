import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../UseHook/UseAxiosSecure";
import UseCart from "../../UseHook/UseCart";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import UseAdress from "../../UseHook/UseAdress";
import { Link } from "react-router-dom";

export default function CheckOutForm() {
  const [adress] = UseAdress();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const axiosSecure = UseAxiosSecure();
  const [cart, refetch] = UseCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    
    if (adress.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No Address Found',
        text: 'Please add your address before proceeding to payment.',
      });
      return;
    }


    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("payment error", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmed error");
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id ", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const storedColors =
          JSON.parse(localStorage.getItem("selectedColors")) || [];
        console.log("Stored colors:", storedColors);

        // Creating colorData based on storedColors and cart items
        const colorData = cart.map((item) => {
          const colorItem = storedColors.find(
            (color) => color.productId === item.productId
          );
          return {
            productId: item.productId,
            selectedColor: colorItem ? colorItem.selectedColor : "red", // Default to 'red' if no color found
          };
        });

        // Debugging colorData
        console.log("Color Data before sending to server:", colorData);

        const payment = {
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          date: new Date(),
          cartIds: cart.map((item) => item._id),
          menuProductIds: cart.map((item) => item.productId),
          productName: cart.map((item) => item.title),
          productImg: cart.map((item) => item.img),
          category: cart.map((item) => item.category),
          status: "pending",
          colors: colorData, // Ensure colorData is set correctly
          name: adress[0]?.name,
          adress: adress[0]?.adress,
          city: adress[0]?.city,
          phone: adress[0]?.phone,
          country: adress[0]?.country,
          user: user.email,
        };

        console.log("Payment Object:", payment); // Debugging line

        const res = await axiosSecure.post("/payments", payment);
        console.log("Response from database:", res.data); // Debugging line
        refetch();
        if (res.data?.paymentResult?.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Payment Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };

  return (
    <div className="py-11 px-4 lg:my-11 shadow-xl lg:w-[30%] m-auto">
      <h1 className="text-xl p-2 text-white bg-[#B88E2F] mb-2">
        Total Price : {totalPrice}
      </h1>
      <div className=" ">
        <div className=" border bg-white rounded-md p-4">
          <h1 className="text-3xl bg-">My Address:</h1>
          {adress.map((adres) => (
            <div className="py-2" key={adres._id}>
              <h1>Name : {adres.name}</h1>
              <h1 className="py-1">Phone: {adres.phone}</h1>
              <h1>Adress: {adres.adress}</h1>
              <h1 className="py-1">City: {adres.city}</h1>
              <h1>Country: {adres.country}</h1>
            </div>
          ))}
          <div className="flex justify-between">
          <Link className="bg-sky-600 text-white px-5 py-2" to="/userhome">
            <button className="">Edit</button>
          </Link>
          <Link className="bg-green-700 text-white px-5 py-2" to="/myadress">
            <button className="">Add</button>
          </Link>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <form onSubmit={handleSubmit}>
          <CardElement
            className="border p-3 rounded-md"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "black",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="bg-[#B88E2F] px-7 py-1 mt-3 text-white rounded-sm"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
          <p className="text-red-700">{error}</p>
          <p>
            {transactionId && (
              <p className="text-green-600">
                your transaction Id : {transactionId}
              </p>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
