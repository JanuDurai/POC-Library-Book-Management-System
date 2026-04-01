import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { Cart } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import useCartItem from "../GetDetails/FetchCartDetails";
import NavBar from "../Pages/NavBar";
import useUpdateData from "../GetDetails/updateQuantity";

function CartPage(){
  const [cart, setCartItems] = useCartItem() as any;
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const cartUrl = `${apiUrl}/cartItems`;
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [cartItems, setCart] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [prevQuantity, setPrevQuantity] = useState([]);
  const { data, updateData } = useUpdateData();

  useEffect(() => {
    const fetchCartDetails = async () => {
      await setCartItems();
      if (JSON.stringify(cartItems) === JSON.stringify([])) {
        setCart(cart as any);
      } else if (
        JSON.stringify(productQuantity) !== JSON.stringify([]) &&
        JSON.stringify(prevQuantity) !== JSON.stringify(productQuantity)
      ) {
        setCart(cart as any);
        setPrevQuantity({ ...productQuantity });
      }
      console.log('cart items',cartItems);
      
    };
    fetchCartDetails();
  }, [cart, productQuantity]);

  /* To increase quantity of added book in cart */
  async function increaseQuantity(productData:any) {
    const item:any = cartItems.filter(
      (data:any) => data.product.id === productData.product.id
    );
    const product = item[0].product;
    product.cartId = productData.cartId;
    const quantity = item[0].quantity + 1;
    updateQuantity(product, quantity);
  }

  /* To decrease quantity of added book in cart */
  async function decreaseQuantity(productData:any) {
    const item:any = cartItems.filter(
      (data:any) => data.product.id === productData.product.id
    );
    const product = item[0].product;
    product.cartId = productData.cartId;
    let quantity = item[0].quantity - 1;
    if (quantity <= 0) quantity = 1;
    updateQuantity(product, quantity);
  }

  /* To update quantity of added book in cart */
  async function updateQuantity(product:any, quantity:number) {
    const id = product.cartId;
    const productDetails = JSON.stringify({
      product_quantity: quantity,
      product_id: product.id,
      user_id: userId,
    });
    const cartUrlId = `${cartUrl}/${id}`;
    await updateData(cartUrlId, productDetails);
    setProductQuantity({ ...productQuantity, data } as any);
  }

  function NavigatetoOrderPage() {
    navigate("/order");
  }

  return (
    <>
      <NavBar />
      {cartItems.length ? (
        <Row>
          <Col className="col-5"></Col>
          <Col className="col-2">
            <Row lg={1}>
              {cartItems &&
                cartItems.map((d:any) => {
                  return (
                    <Col className="d-flex">
                      <Card key={d.product.id} className="m-2 flex-fill">
                        <Card.Img variant="top" src={d.product.image} />
                        <Card.Title>{d.product.title}</Card.Title>
                        <Card.Body>
                          <Button
                            variant="dark px-3 m-3"
                            onClick={() => decreaseQuantity(d)}
                          >
                            -
                          </Button>
                          <Button className="px-3 m-3">
                            {d.quantity}
                          </Button>
                          <Button
                            variant="dark px-3 m-3"
                            onClick={() => increaseQuantity(d)}
                          >
                            +
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <Button
              variant="dark"
              className="m-4 p-3"
              onClick={NavigatetoOrderPage}
            >
              Buy Books
            </Button>
          </Col>
          <Col className="col-5"></Col>
        </Row>
      ) : (
        <div className="text-center my-5">
          <Row className="my-5">
            <Col>
              <p className="dark">Cart is empty!!!!</p>
              <Cart color="black" size={250} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default CartPage;