import {
  Box,
  Heading,
  VStack,
  Image,
  HStack,
  Link,
  useToast,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { icons } from "../../assets/assets";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setIsLoading,
  setUser,
} from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import config from "../../config/config";
import FullScreenLoader from "../../components/loaders/FullScreenLoader";
import communityGuidlines from "../../assets/constants/communityGuidelnes";
import faqs from "../../assets/constants/faqs";
import LandingPageModal from "../../components/modals/LandingPageModal";
import termsOfService from "../../assets/constants/termOfService";

const LandingPage = () => {
  const { accessToken, isLoading } = useSelector(
    (state) => state.authSliceReducer
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  // modals
  const {
    isOpen: isOpenTOS,
    onOpen: onOpenTOS,
    onClose: onCloseTOS,
  } = useDisclosure();
  const {
    isOpen: isOpenCG,
    onOpen: onOpenCG,
    onClose: onCloseCG,
  } = useDisclosure();

  // GSAP
  const { contextSafe } = useGSAP();
  const heroTextRef = useRef();

  const handleOnSuccessfulSignInWithGoogle = async (credentialResponse) => {
    // Decode the token to get user details
    const token = credentialResponse.credential;
    const user = jwtDecode(token);

    try {
      dispatch(setIsLoading(true));
      const { data } = await axios.post(
        `${config.BACKEND_URL}/api/v1/auth/sign-in-with-google`,
        {
          email: user.email,
          username: user.name,
          profilePic: user.picture,
        }
      );

      if (data.success) {
        toast({
          title: "Sign in successful!",
          status: "success",
        });
        dispatch(setUser(data.user));
        dispatch(setAccessToken(data.token));
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("accessToken", data.token);
        navigate("/posts");
      } else {
        throw Error(data.message);
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        status: "error",
      });
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const handleError = () => {
    toast({
      title: "Some error occured!",
      isClosable: true,
    });
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

    const mouseClickAnimationTl = gsap.timeline({
      delay: 2,
      repeat: -1,
      yoyo: true,
    });

    const animateMouseClick = contextSafe(() => {
      mouseClickAnimationTl.to(".mouseClickAnimation", {
        top: "60",
        delay: 1,
        right: { base: "35%", sm: "35%", md: "40%", lg: "45%" },
        opacity: 1,
        duration: 1,
      });

      mouseClickAnimationTl.to(".mouseClickAnimation", {
        rotate: -10,
        duration: 0.5,
      });
    });

    animateHeroText();
    animateMouseClick();
  }, [contextSafe]);

  useEffect(() => {
    if (accessToken) {
      navigate("/posts");
    }
  }, [navigate, accessToken]);

  if (isLoading) return <FullScreenLoader />;

  return (
    <VStack>
      {/* Hero Section */}
      <Box minHeight={"100vh"}>
        {/* Hero Content */}
        <Box
          minH={"60vh"}
          width={"100%"}
          paddingX={{ base: "0", md: "5rem", xl: "15rem" }}
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
            className="heroLeftDiv"
            bgColor={"#111"}
            overflow={"hidden"}
          >
            <Heading
              ref={heroTextRef}
              width={"100%"}
              fontFamily={`Jockey One`}
              fontSize={{ base: "4xl", md: "5xl" }}
              color={"white"}
              className="heroText"
              textAlign={"center"}
            >
              <span className="heroTextWord">Share</span>
              <span
                className="heroTextWord"
                style={{ textDecoration: "underline yellow" }}
              >
                amazing{" "}
              </span>
              <span className="heroTextWord">secrets</span>
              <span
                className="heroTextWord"
                style={{ textDecoration: "underline yellow" }}
              >
                funny
              </span>
              <span className="heroTextWord">stories</span>
              <span
                className="heroTextWord"
                style={{ textDecoration: "underline yellow" }}
              >
                confessions
              </span>
              <span className="heroTextWord">and</span>
              <span
                className="heroTextWord"
                style={{ textDecoration: "underline yellow" }}
              >
                reviews
              </span>
              <span className="heroTextWord">from</span>
              <span className="heroTextWord">your</span>
              <span className="heroTextWord">workplace</span>
              <span className="heroTextWord">over</span>
              <span className="heroTextWord">here!</span>
            </Heading>
          </Box>
        </Box>

        {/* Sign in box */}
        <VStack
          h={"100%"}
          position={"relative"}
          width={"100%"}
          py={2}
          overflow={"hidden"}
        >
          <Text color={"white"}>Join The Conversation Now</Text>
          <GoogleLogin
            onSuccess={handleOnSuccessfulSignInWithGoogle}
            onError={handleError}
          />
          <Box
            className="mouseClickAnimation"
            position={"absolute"}
            top={"100px"}
            right={{ base: "35%", sm: "35%", md: "40%", lg: "45%" }}
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
      </Box>

      {/* Features and How it works! */}

      {/* Community Guidelines and FAQs*/}
      <Box width={"100%"} display={"flex"} justifyContent={"center"} px={5}>
        {/* FAQs */}
        <VStack
          bgColor={"#111"}
          width={{ base: "100%", lg: "60%" }}
          border={"1px solid white"}
          p={5}
          borderRadius={6}
          color={"white"}
        >
          <Heading fontFamily={"Jockey One"}>FAQs</Heading>
          <Accordion allowToggle width={"100%"}>
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx}>
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="10"
                      textAlign="left"
                      fontFamily={"Jockey One"}
                      fontSize={"2xl"}
                    >
                      {faq.question}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize={"xl"}>
                  {faq.answer}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </VStack>
      </Box>

      {/* Footer */}
      <Box
        color={"white"}
        padding={"5"}
        _selection={{
          bgColor: "white",
          color: "black",
        }}
        display={"flex"}
        flexDirection={"column"}
        gap={10}
      >
        <HStack justifyContent={"center"}>
          <Link textDecoration={"underline"}>Contact Us</Link>
          <Link textDecoration={"underline"} onClick={onOpenTOS}>
            Terms Of Service
          </Link>
          <Link textDecoration={"underline"} onClick={onOpenCG}>
            Community Guidelines
          </Link>
        </HStack>

        {/* TOS Modal */}
        <LandingPageModal
          modalTitle={"Terms Of Service"}
          modalContent={termsOfService}
          isOpen={isOpenTOS}
          onClose={onCloseTOS}
        />
        {/* CG Modal */}
        <LandingPageModal
          modalTitle={"Community Guidelines"}
          modalContent={communityGuidlines}
          isOpen={isOpenCG}
          onClose={onCloseCG}
        />

        <HStack justifyContent={"center"}>
          <Text>© 2024 Workplace Whispers. All rights reserved.</Text>
        </HStack>
      </Box>
    </VStack>
  );
};

export default LandingPage;
