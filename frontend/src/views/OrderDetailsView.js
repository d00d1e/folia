import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function OrderDetailsView(props) {
  const orderId = props.match.params.id;
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsOrder(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1>Thank you. Your Order Is In!</h1>
      <h4>Order #{order._id}</h4>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body border">
                <h2>Shipping Address</h2>
                <p>
                  {order.shippingAddress.fullName} <br />
                  {order.shippingAddress.address} <br />
                  {order.shippingAddress.city} <br />
                  {order.shippingAddress.postalCode}{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body border">
                <h2>Payment Method</h2>
                <p>{order.paymentMethod}</p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body border">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>
                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div>
            <div className="card card-body border">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>
                      Items: ({order.orderItems.reduce((a, c) => a + c.qty, 0)})
                    </div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Estimated tax:</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping & handling:</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                  </div>
                </li>
                <hr />
                <li>
                  <div className="row">
                    <div>
                      <strong>Order Total</strong>
                    </div>
                    <div>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
