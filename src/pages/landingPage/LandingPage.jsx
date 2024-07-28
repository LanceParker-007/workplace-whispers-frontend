import {
  Box,
  Button,
  Heading,
  VStack,
  Image,
  HStack,
  Link,
} from "@chakra-ui/react";
import { RiGoogleFill } from "@remixicon/react";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const LandingPage = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const { contextSafe } = useGSAP();
  const heroTextRef = useRef();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const tl = gsap.timeline();

    const animateheroLeftDiv = contextSafe(() => {
      tl.from(".heroLeftDiv", {
        x: "-150%",
        delay: 1,
      });
    });

    const animateHeroText = contextSafe(() => {
      tl.from(".heroTextWord", {
        y: -500,
        opacity: 0,
        stagger: 0.1,
        duration: 2.5,
        ease: "bounce.out",
      });
    });

    const animateHeroImage = contextSafe(() => {
      gsap.from(".heroImage", {
        x: "500%",
        opacity: 0,
        duration: 5,
        ease: "elastic.in",
      });
    });

    animateheroLeftDiv();
    animateHeroText();
    animateHeroImage();
  }, []);

  return (
    <VStack minH={"50vh"}>
      <Box
        minH={"60vh"}
        width={"100%"}
        paddingX={{ base: "0", lg: "15rem" }}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
        // bgColor={"white"}
      >
        <Box
          display={"flex"}
          justifyContent={{ sm: "center" }}
          alignItems={"center"}
          width={{ base: "90%", md: "100%" }}
          px={{ base: 10 }}
          className="heroLeftDiv"
          bgColor={"#111"}
        >
          <Heading
            ref={heroTextRef}
            width={"100%"}
            textAlign={{ base: "center", md: "left" }}
            fontFamily={`Jockey One`}
            fontSize={"5xl"}
            color={"white"}
            className="heroText"
          >
            <span className="heroTextWord">Share</span>
            <span className="heroTextWord">amazing</span>
            <span className="heroTextWord">secrets</span>
            <span className="heroTextWord">funny</span>
            <span className="heroTextWord">stories</span>
            <span className="heroTextWord">confessions</span>
            <span className="heroTextWord">from</span>
            <span className="heroTextWord">your</span>
            <span className="heroTextWord">work</span>
            <span className="heroTextWord">place</span>
            <span className="heroTextWord">over</span>
            <span className="heroTextWord">here</span>
          </Heading>
        </Box>
        <Box
          width={{ base: "90%", md: "50%" }}
          display={"flex"}
          justifyContent={{ base: "center", lg: "right" }}
          alignItems={"center"}
          overflowX={"hidden"}
        >
          <Image
            className={"heroImage"}
            height={"100%"}
            objectFit={"cover"}
            objectPosition={"center"}
            src={screenWidth < "800px" ? image2 : image1}
          />
        </Box>
      </Box>
      <Box h={"100%"}>
        <Button width={"200px"}>
          <RiGoogleFill />
        </Button>
      </Box>
      <Box color={"white"} padding={"5"}>
        <HStack>
          <Link textDecoration={"underline"}>Contact Us</Link>
          <Link textDecoration={"underline"}>Made by TheRevolutionries</Link>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LandingPage;
