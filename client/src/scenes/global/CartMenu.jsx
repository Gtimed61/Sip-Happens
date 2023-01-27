import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { useRef, useEffect, useState } from "react";
import ShoppingList, { shoppingCart } from "../home/ShoppingList";
import { red } from "@mui/material/colors";

export function makeShoppingCartDiv(cart) {
  const items = [];
  for (let [coffee, quantity] of cart) {
    items.push(
      <MDBCardTitle>
        {coffee} - {quantity}
      </MDBCardTitle>
    );
  }
  return (
    <MDBCard>
      <MDBCardImage />
      <MDBCardBody>{items}</MDBCardBody>
    </MDBCard>
  );
}

function clearCart() {
  shoppingCart.clear();
  console.log(shoppingCart);
}
function calculateTotalPrice(shoppingCart) {
  let totalPrice = 0;
  for (let item of shoppingCart.entries()) {
      totalPrice += item[1] * 5.99;
  }
  return totalPrice.toFixed(2);
}

const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CartMenu = () => {
  console.log(shoppingCart);
  let totalPrice = 69;
  useEffect(() => {
    console.log("shoppingCart changed");
    totalPrice = calculateTotalPrice(shoppingCart);
  }, [shoppingCart]);
  const parentRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  totalPrice = calculateTotalPrice(shoppingCart);

  return (
    <Box
      display={isCartOpen ? "block" : "none"}
      backgroundColor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box ref={parentRef} padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box id="1">{makeShoppingCartDiv(shoppingCart)}</Box>

          {/* ACTIONS */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">${totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                clearCart(shoppingCart);
              }}
            >
              CLEAR CART
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
