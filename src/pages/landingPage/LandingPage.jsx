import {
  Box,
  Heading,
  VStack,
  Image,
  HStack,
  Link,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { icons } from "../../assets/assets";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUser } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";

const LandingPage = () => {
  const { accessToken } = useSelector((state) => state.authSliceReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const { contextSafe } = useGSAP();
  const heroTextRef = useRef();

  const handleOnSuccessfulSignInWithGoogle = async (credentialResponse) => {
    // Decode the token to get user details
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    try {
      const { data } = await axios.post(
        `${config.BACKEND_URL}/api/v1/auth/sign-in-with-google`,
        {
          email: user.email,
          username: user.name,
          profilePic: user.picture,
        }
      );
      console.log(data.token);

      if (data.success) {
        toast({
          title: "Sign in successful",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        await dispatch(setUser(data.user));
        await dispatch(setAccessToken(data.token));
        localStorage.setItem("user", user);
        localStorage.setItem("accessToken", data.token);
        navigate("/posts");
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Account creation failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  useEffect(() => {
    const animateHeroText = contextSafe(() => {
      gsap.from(".heroTextWord", {
        x: "100%",
        opacity: 0,
        stagger: 0.1,
        duration: 2.5,
        ease: "elastic.inOut",
      });
    });

    // const animateHeroImage = contextSafe(() => {
    //   gsap.from(".heroImage", {
    //     x: "500%",
    //     opacity: 0,
    //     duration: 2,
    //     ease: "bounce.in",
    //   });
    // });

    const mouseClickAnimationTl = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
    });

    const animateMouseClick = contextSafe(() => {
      mouseClickAnimationTl.to(".mouseClickAnimation", {
        top: "25",
        delay: 1,
        right: { base: "30%", sm: "35%", md: "40%", lg: "45%" },
        opacity: 1,
        duration: 1,
      });

      mouseClickAnimationTl.to(".mouseClickAnimation", {
        rotate: -10,
        duration: 0.5,
      });
    });

    animateHeroText();
    // animateHeroImage();
    animateMouseClick();
  }, []);

  useEffect(() => {
    if (accessToken) {
      navigate("/posts");
    }
  }, [accessToken]);

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
            textAlign={{ base: "center", lg: "left" }}
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
          width={{ base: "90%", md: "0%" }}
          display={"flex"}
          justifyContent={{ base: "center", lg: "right" }}
          alignItems={"center"}
          overflowX={"hidden"}
        >
          {/* <Image
            className={"heroImage"}
            height={"100%"}
            objectFit={"cover"}
            objectPosition={"center"}
            src={screenWidth < "800px" ? icons.image2 : icons.image1}
          /> */}
        </Box>
      </Box>
      <VStack
        h={"100%"}
        position={"relative"}
        width={"100%"}
        py={2}
        overflow={"hidden"}
      >
        <GoogleLogin
          onSuccess={handleOnSuccessfulSignInWithGoogle}
          onError={handleError}
        />
        <Box
          className="mouseClickAnimation"
          position={"absolute"}
          top={"100px"}
          right={{ base: "30%", sm: "35%", md: "40%", lg: "45%" }}
          opacity={0}
          boxSize={5}
        >
          <Image
            src={icons.macOsFingerPointer}
            alt={"macOsFingerPointer"}
            height={"100%"}
          />
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
