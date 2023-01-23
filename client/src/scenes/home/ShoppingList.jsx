import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { useLazyQuery } from '@apollo/client';
import { assertValidExecutionArguments } from "graphql/execution/execute";
import gql from "graphql-tag";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';



// const client = ...
const GET_HOT = gql`
query Hots {
  allHots {
   title
   image
   description
 } 
}
`;
const GET_ICEDS = gql`
query Iceds {
  allIceds {
   title
   image
 } 
} 
`;



const ShoppingList = () => {
  const [getIced, { loading: loadingIce, data: dataIce } ] = useLazyQuery(
    GET_ICEDS
  );
  const breakPoint = useMediaQuery("(min-width:600px)");
  const [getHots, { loading, data } ] = useLazyQuery(
    GET_HOT 
  );
  
  
 



 

  if (data) {
    console.log(data.allHots[0].image);
  }
  if (dataIce) {
    console.log(dataIce);
  }

function generateImage(coffee, index) {
  return (
   
   <MDBCard>
      <MDBCardImage src={coffee.image} position='top' style={{ width: "300px", height: "300px", border: "solid"}} />
      <MDBCardBody>
        <MDBCardTitle style={{fontSize: "25px", textAlign: "center"}}>{coffee.title}</MDBCardTitle>
        <MDBCardText>
          {coffee.description}
        </MDBCardText>
        <MDBBtn href='#'>$5.99 <br></br> Add To Cart</MDBBtn>
        
        
      </MDBCardBody>
    </MDBCard>


  )
}
  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab onClick={()=> getHots() } label="VIEW OUR COFFEES" />   
      </Tabs>
      
  

      
      <Box
        position="center"
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
       {data &&
        data.allHots &&
        data.allHots.map((c, i) => <div key={i}>{c.title}</div>) &&
        data.allHots.map((c, i) => generateImage(c, i))


       }
       
      </Box>
    </Box>
  );
};

export default ShoppingList;
