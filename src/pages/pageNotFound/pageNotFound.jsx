import { Center, Heading } from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import React from "react";

const PageNotFound = () => {
  return (
    <Center color={"#fff"} height={"50vh"} _>
      <Heading
        fontFamily={"Jockey One"}
        p={50}
        bgColor={"white"}
        color={"#111"}
        _selection={{
          bgColor: "#111",
          color: "white",
        }}
        borderRadius={5}
      >
        Page Not Found
      </Heading>
    </Center>
  );
};

export default PageNotFound;
