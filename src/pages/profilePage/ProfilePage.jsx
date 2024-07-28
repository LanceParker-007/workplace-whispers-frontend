import {
  Box,
  FormControl,
  Input,
  FormLabel,
  FormHelperText,
  HStack,
  Textarea,
  VStack,
  Button,
} from "@chakra-ui/react";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import AllPostsPage from "../allPostsPage/AllPostsPage";

const ProfilePage = () => {
  const [postData, setPostData] = useState({
    title: "",
    companyName: "",
    location: "",
    content: "",
  });
  const [showForm, setShowForm] = useState(false);

  const handlePostData = (e) => {
    setPostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreatePost = () => {
    console.log(postData);
  };

  return (
    <VStack>
      {!showForm ? (
        <Button onClick={() => setShowForm(true)}>Create Post</Button>
      ) : (
        <></>
        // <Button
        //   variant={"outline"}
        //   colorScheme={"red"}
        //   onClick={() => setShowForm(false)}
        // >
        //   Cancel
        // </Button>
      )}
      {showForm ? (
        <VStack
          maxW={"md"}
          minH={"50vh"}
          mx={"auto"}
          borderRadius={10}
          bgColor={"white"}
          padding={5}
        >
          <FormControl>
            <FormLabel mb={-1}>Post Title</FormLabel>
            <Input
              type="text"
              size={"sm"}
              name="title"
              onChange={handlePostData}
            />
          </FormControl>
          <HStack w={"100%"}>
            <FormControl>
              <FormLabel mb={-1}>Company</FormLabel>
              <Input
                type="text"
                size={"sm"}
                name="companyName"
                onChange={handlePostData}
              />
            </FormControl>
            <FormControl>
              <FormLabel mb={-1}>Location</FormLabel>
              <Input
                type="text"
                size={"sm"}
                name="location"
                onChange={handlePostData}
              />
            </FormControl>
          </HStack>
          <FormControl>
            <FormLabel mb={-1}>
              Your story/ confession/ secret goes here...
            </FormLabel>
            <Textarea
              placeholder="Your story..."
              resize={"vertical"}
              size={"sm"}
              rows={20}
              name="content"
              onChange={handlePostData}
            />
          </FormControl>

          <HStack>
            <Button
              variant={"solid"}
              colorScheme={"green"}
              rightIcon={<CheckIcon />}
              onClick={handleCreatePost}
              isLoading={true}
            ></Button>
            <Button
              variant={"outline"}
              colorScheme={"red"}
              onClick={() => setShowForm(false)}
              rightIcon={<SmallCloseIcon />}
            ></Button>
          </HStack>
        </VStack>
      ) : (
        <AllPostsPage />
      )}
    </VStack>
  );
};

export default ProfilePage;
