import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LandingPage from "./pages/landingPage/LandingPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AllPostsPage from "./pages/allPostsPage/AllPostsPage";
import { Box, Center } from "@chakra-ui/react";
import "./App.css";

const App = () => {
  return (
    <Center>
      <Box
        w={{ base: "100%" }}
        minHeight={"100vh"}
        borderRight={"1px solid black"}
        borderLeft={"1px solid black"}
        bgColor={"#111"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Header />
        <Box mt={"85px"} width={"100%"}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/posts" element={<AllPostsPage />} />
            <Route path="/*" />
          </Routes>
        </Box>
      </Box>
    </Center>
  );
};

export default App;
