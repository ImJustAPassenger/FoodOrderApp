import Modal from "./UI/Modal";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";
export default function Cart() {
  const cartCtx = useContext(CartContext);

  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleOpenCheckout() {
    userProgressCtx.showCheckout();
  }

  return (
    <Modal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart"?handleCloseCart:null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => {
          return (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          );
        })}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)} </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button textOnly onClick={handleOpenCheckout}>
            Go to Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
}
