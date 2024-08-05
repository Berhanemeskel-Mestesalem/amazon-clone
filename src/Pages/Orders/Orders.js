import React, { useContext, useEffect,useState } from "react";


import Layout from "../../Components/LayOut/LayOut";
import ProductCard from "../../Components/Product/ProductCard";
import classes from "./Orders.module.css"
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";


function Orders() {
  const [{ user },] = useContext(DataContext); // Destructure user directly from context
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection('users')
        .doc(user.uid)
        .collection('orders')
        .orderBy('created', 'desc')
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data()
          })));
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {orders?.map((eachOrder, i) => (
            <div key={i}>
							<hr />
              <p>Order ID: {eachOrder.id}</p>
              {eachOrder.data.basket?.map((order) => (
                <ProductCard
                  flex={true}
                  product={order}
                  key={order.id}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default Orders;