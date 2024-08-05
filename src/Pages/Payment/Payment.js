import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import Layout from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Payment() {
  const [{ user, basket },] = useContext(DataContext);
  console.log(user);

  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const [cardError, setCardError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    console.log(e);
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  };
  return (
    <Layout>
      {/* {header} */}
      <div className={classes.Payment_header}>Checkout ({totalItem}) items</div>
      {/* {payment method} */}
      <section className={classes.Payment}>
        {/* {adress} */}
        <div className={classes.flex}>
          <h3> Delivery Address</h3>

          <div>
            <div>{user?.email}</div>
            <div>1235 React Lane</div>
            <div>Chikago, IL</div>
          </div>
        </div>
        <hr />
        {/* {product} */}
        <div className={classes.flex}>
          <h3>Review items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* {card form} */}
        <div className={classes.flex}>
          <h3>
            Payment methods
            <div className={classes.Payment_card_container}>
              <div className={classes.payment_details}>
                <form action="">
                  {cardError && (
                    <small style={{ color: "red" }}>{cardError}</small>
                  )}
                  <CardElement onChange={handleChange} />
                  {/* {price} */}
                  <div className={classes.payment_price}>
                    <div>
                      <span style={{ display: "flex", gap: "10px"}}>
                        Total Order  <CurrencyFormat amount={total} />
                      </span>
                    </div>
                    <button>Pay Now</button>
                  </div>
                </form>
              </div>
            </div>
          </h3>
        </div>
      </section>
    </Layout>
  );
}

export default Payment;
