import {
  Box,
  Button,
  Heading,
  VStack,
  Image,
  HStack,
  Link,
  Text,
} from "@chakra-ui/react";
import { RiCursorFill, RiCursorLine, RiGoogleFill } from "@remixicon/react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { icons } from "../../assets/assets";

const LandingPage = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const { contextSafe } = useGSAP();
  const heroTextRef = useRef();

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    const animateHeroText = contextSafe(() => {
      gsap.from(".heroTextWord", {
        x: "100%",
        opacity: 0,
        stagger: 0.1,
        duration: 2.5,
        ease: "elastic.inOut",
      });
    });

    const animateHeroImage = contextSafe(() => {
      gsap.from(".heroImage", {
        x: "500%",
        opacity: 0,
        duration: 2,
        ease: "bounce.in",
      });
    });

    const mouseClickAnimationTl = gsap.timeline({ repeat: -1, yoyo: true });

    const animateMouseClick = contextSafe(() => {
      mouseClickAnimationTl.to(".mouseClickAnimation", {
        top: "25",
        right: "40%",
        opacity: 1,
        duration: 1,
      });

      mouseClickAnimationTl.to(".mouseClickAnimation", {
        rotate: -15,
      });
    });

    animateHeroText();
    animateHeroImage();
    animateMouseClick();
  }, []);

  return (
    <VStack minH={"50vh"}>
      <Box
        minH={"60vh"}
        width={"100%"}
        paddingX={{ base: "0", md: "10rem", xl: "15rem" }}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          display={"flex"}
          justifyContent={{ sm: "center" }}
          alignItems={"center"}
          width={{ base: "90%", md: "100%" }}
          px={{ md: 10 }}
          className="heroLeftDiv"
          bgColor={"#111"}
          overflow={"hidden"}
        >
          <Heading
            ref={heroTextRef}
            width={"100%"}
            textAlign={{ base: "center", md: "left" }}
            fontFamily={`Jockey One`}
            fontSize={{ base: "4xl", md: "5xl" }}
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
            src={screenWidth < "800px" ? icons.image2 : icons.image1}
          />
        </Box>
      </Box>
      <VStack
        h={"100%"}
        position={"relative"}
        width={"100%"}
        py={2}
        overflow={"hidden"}
      >
        <Button width={"200px"} rightIcon={<RiGoogleFill />}>
          <Text mt={1.5}>Sign in with</Text>
        </Button>
        <Box
          className="mouseClickAnimation"
          position={"absolute"}
          top={"100px"}
          right={"40%"}
          opacity={0}
        >
          <RiCursorFill />
        </Box>
      </VStack>
      <Box
        color={"white"}
        padding={"5"}
        _selection={{
          bgColor: "white",
          color: "black",
        }}
      >
        <HStack>
          <Link textDecoration={"underline"}>Contact Us</Link>
          <Link textDecoration={"underline"}>Made by TheRevolutionries</Link>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LandingPage;
