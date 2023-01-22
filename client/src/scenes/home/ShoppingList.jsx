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



// const client = ...
const GET_HOT = gql`
query Hots {
  allHots {
   title
   image
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
    console.log(data);
  }
  if (dataIce) {
    console.log(dataIce);
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
        <Tab onClick={()=> getHots() } label="HOT" />
        <Tab onClick={()=> getIced() } label="ICED" />      
        </Tabs>
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="25px"
        columnGap="1.33%"
      >
        
      </Box>
    </Box>
  );
};

export default ShoppingList;