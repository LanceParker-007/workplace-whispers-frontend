import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import LandingPage from "./pages/landingPage/LandingPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AllPostsPage from "./pages/allPostsPage/AllPostsPage";
import { Box, Center } from "@chakra-ui/react";
import PageNotFound from "./pages/pageNotFound/pageNotFound";
import ProtectedRoutes from "./middleware/ProtectedRoutes";

const App = () => {
  return (
    <>
      <Header />
      <Center
        w={{ base: "100%" }}
        minHeight={"90vh"}
        bgColor={"#111"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        <Box width={"100%"}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <ProfilePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/posts"
              element={
                <ProtectedRoutes>
                  <AllPostsPage />
                </ProtectedRoutes>
              }
            />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Box>
      </Center>
    </>
  );
};

export default App;
