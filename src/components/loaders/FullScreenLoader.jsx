import { Box, Center } from "@chakra-ui/react";
import React from "react";
import "./fullScreenLoader.css";

const FullScreenLoader = () => {
  return (
    <Center height={"80vh"} width={"100%"} bgColor={"#111"}>
      <div className="loader"></div>
    </Center>
  );
};

export default FullScreenLoader;
