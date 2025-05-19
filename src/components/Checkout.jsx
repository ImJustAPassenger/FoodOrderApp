import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Button from "./UI/button";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";
import { useActionState } from "react";

const requestConfig = {
  method: "POST",
  header: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartcCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const cartTotal = cartcCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  const {
    data,
    error,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleClose() {
    userProgressCtx.hideCheckout();
    
  }
  function handleFinish() {
    userProgressCtx.hideCart();
    cartcCtx.clearCart();
    clearData()
  }

  function checkoutAction(fd) {

    const customerData = Object.fromEntries(fd.entries()); //for saving all the data entered by the user

    sendRequest({
      order: {
        items: cartcCtx.items,
        customer: customerData,
      },
    });
  }

const [formState,formAction,isSending] =useActionState(checkoutAction,null) 

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = (
      <>
        <span>Sending order data... </span>
      </>
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was submitted successfully</p>
        <p>
          We will get back to you with more details via emails in next few
          minutes
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {cartTotal}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && (
          <ErrorPage title="Failed to submit order" message={error}></ErrorPage>
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
