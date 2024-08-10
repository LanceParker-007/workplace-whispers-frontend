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
import { useDispatch, useSelector } from "react-redux";
import { createNewPost } from "../../redux/action/postsAction";
import DisplayPosts from "../../components/displayPosts/DisplayPosts";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.authSliceReducer);
  const { isLoading } = useSelector((state) => state.postsSliceReducer);
  const [postData, setPostData] = useState({
    title: "",
    companyName: "",
    companyLocation: "",
    content: "",
  });
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  const handlePostData = (e) => {
    setPostData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreatePost = () => {
    dispatch(
      createNewPost({
        title: postData.title,
        companyName: postData.companyName,
        companyLocation: postData.companyLocation,
        content: postData.content,
      })
    );
    setShowForm(false);
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
              size={"md"}
              name="title"
              onChange={handlePostData}
            />
          </FormControl>
          <HStack w={"100%"}>
            <FormControl>
              <FormLabel mb={-1}>Company</FormLabel>
              <Input
                type="text"
                size={"md"}
                name="companyName"
                onChange={handlePostData}
              />
            </FormControl>
            <FormControl>
              <FormLabel mb={-1}>Location</FormLabel>
              <Input
                type="text"
                size={"md"}
                name="companyLocation"
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
              size={"md"}
              rows={15}
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
              isLoading={isLoading}
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
        <DisplayPosts
          userId={user?._id || JSON.parse(localStorage.getItem("user"))._id}
        />
      )}
    </VStack>
  );
};

export default ProfilePage;
