// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { savePaymentMethod } from "../actions/cartActions";
// import CheckoutSteps from "../components/CheckoutSteps";

// export default function PaymentView(props) {
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress } = cart;
//   if (!shippingAddress.address) {
//     props.history.push("/shipping");
//   }
//   const [paymentMethod, setPaymentMethod] = useState("PayPal");

//   const dispatch = useDispatch();
//   const submitHandler = (e) => {
//     e.preventDefault();
//     dispatch(savePaymentMethod(paymentMethod));
//     props.history.push("/order");
//   };

//   return (
//     <div>
//       <CheckoutSteps step1 step2 step3 />
//       <form className="form" onSubmit={submitHandler}>
//         <div>
//           <h1>Payment Method</h1>
//         </div>
//         <div>
//           <div>
//             <input
//               id="paypal"
//               type="radio"
//               value="PayPal"
//               name="paymentMethod"
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               checked
//               required
//             />
//             <label htmlFor="paypal">PayPal</label>
//           </div>
//           <div>
//             <input
//               id="stripe"
//               type="radio"
//               value="Stripe"
//               name="paymentMethod"
//               onChange={(e) => setPaymentMethod(e.target.value)}
//               required
//             />
//             <label htmlFor="stripe">Stripe</label>
//           </div>
//         </div>
//         <div>
//           <button className="primary" type="submit">
//             Continue
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";

export default function PaymentVew(props) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    props.history.push("/shipping");
  }
  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    props.history.push("/order");
  };
  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Payment Method</h1>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="paypal"
              value="PayPal"
              name="paymentMethod"
              required
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paypal">PayPal</label>
          </div>
        </div>
        <div>
          <div>
            <input
              type="radio"
              id="stripe"
              value="Stripe"
              name="paymentMethod"
              required
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="stripe">Stripe</label>
          </div>
        </div>
        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
