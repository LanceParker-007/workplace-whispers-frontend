import {
  RiAccountCircleFill,
  RiGoogleFill,
  RiInstagramFill,
} from "@remixicon/react";
import windIcon from "../../assets/images/windIcon.svg";
import { Heading, HStack, Image, Box } from "@chakra-ui/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logoTextRef = useRef(null);

  const { contextSafe } = useGSAP();

  // TODO: Uncomment at last
  useGSAP(() => {
    gsap.from(".logoIcon", {
      x: 55,
      opacity: 0,
      delay: 2,
    });
  }, []);

  useEffect(() => {
    const animateLogo = contextSafe(() => {
      gsap.from(".logoTextChar", {
        x: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 2.5,
        ease: "elastic.inOut",
      });
    });
    function breakLogoText() {
      const logoTextElement = logoTextRef.current;
      const logoText = logoTextElement.innerText;
      logoTextElement.innerHTML = ""; // Clear the existing text content
      const spanArray = logoText.split("").map((char) => {
        const spanEle = document.createElement("div");
        spanEle.classList.add("logoTextChar");
        spanEle.style.color = "white";
        spanEle.innerText = char;
        return spanEle;
      });
      spanArray.forEach((spanEle) => {
        logoTextElement.appendChild(spanEle);
      });

      animateLogo();
    }

    breakLogoText();
  }, [contextSafe]);

  return (
    <HStack
      bgColor={"#111"}
      justifyContent={"space-between"}
      p={5}
      className="headerContainer"
      width={{ base: "100%", md: "60%" }}
      zIndex={10}
      position={"fixed"}
    >
      <HStack justifyContent={"center"} gap={"0px"} alignItems={"center"}>
        <Heading
          ref={logoTextRef}
          className="logoText"
          display={"flex"}
          color={"white"}
          fontFamily={`"Jockey One", sans-serif`}
          fontWeight={900}
          fontStyle={"normal"}
        >
          Workspace
        </Heading>
        <Image
          className={"logoIcon"}
          src={windIcon}
          boxSize={"2rem"}
          borderRadius={"50%"}
          mt={0}
          backgroundColor={"#111"}
        />
      </HStack>

      <Box
        color={"white"}
        cursor={"pointer"}
        className="navIconHolder"
        display={"block"}
        _hover={{
          borderRadius: "50%",
          backgroundColor: "white",
          color: " black",
          transform: "scale(1.3)",
          transition: "all 0.5s ease",
        }}
      >
        {location.pathname.includes("/posts") ? (
          <RiAccountCircleFill onClick={() => navigate("/profile")} />
        ) : location.pathname.includes("/profile") ? (
          <RiInstagramFill onClick={() => navigate("/posts")} />
        ) : (
          <RiGoogleFill />
        )}
      </Box>
    </HStack>
  );
};

export default Header;
