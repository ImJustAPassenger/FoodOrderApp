import Button from "./UI/button";
import logoImg from "../assets/logo.jpg";
import { useContext } from "react";
import CartContext from "../store/CartContext";
import UserProgressContrex from "../store/UserProgressContext"
export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContrex)

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItem, item) => {
    return (totalNumberOfItem + item.quantity);
  }, 0);


function handleShowCart(){
    userProgressCtx.showCart()
}

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A Restaurant" />
        <h1>ReactFood</h1>
      </div>
      <nav>
        <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
      </nav>
    </header>
  );
}
