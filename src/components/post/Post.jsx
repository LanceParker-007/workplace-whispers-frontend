import {
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  ButtonGroup,
  Button,
  Image,
  Card,
  Collapse,
  HStack,
  Box,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  RiArrowDownFill,
  RiArrowUpFill,
  RiEdit2Fill,
  RiEdit2Line,
  RiThumbDownFill,
  RiThumbDownLine,
  RiThumbUpFill,
  RiThumbUpLine,
} from "@remixicon/react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { likeDislikePost } from "../../redux/action/postsAction";
import { debounce } from "lodash";
import FullScreenLoader from "../loaders/FullScreenLoader";
import { deletePost } from "../../redux/action/userAction";

const getInitialVotingState = (likesArr, dislikesArr, user) => {
  if (likesArr?.includes(user?._id)) return "Like";
  if (dislikesArr?.includes(user?._id)) return "Dislike";

  return "";
};

const Post = ({ postData }) => {
  const { user } = useSelector((state) => state.authSliceReducer);
  const {
    _id: postId,
    title: cardTitle,
    companyName: companyName,
    compnayLocation: companyLocation,
    content: cardContent,
    likes: likes,
    dislikes: dislikes,
    user: postCreatedBy,
  } = postData;

  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // Handle Like Dislike: Either Like or Dislike or none
  const [votingState, setVotingState] = useState(undefined);
  const [numOfLikes, setNumOfLikes] = useState(likes?.length || 0);
  const [numOfDislikes, setNumOfDislikes] = useState(dislikes?.length || 0);

  const dispatch = useDispatch();

  const handleLikeDislikeState = (voteVal) => {
    if (votingState === voteVal) {
      setVotingState("");
      if (voteVal === "Like") setNumOfLikes(numOfLikes - 1);
      else if (voteVal === "Dislike") setNumOfDislikes(numOfDislikes - 1);
    } else if (!votingState) {
      if (voteVal === "Like") {
        setNumOfLikes(numOfLikes + 1);
      } else if (voteVal === "Dislike") {
        setNumOfDislikes(numOfDislikes + 1);
      }
      setVotingState(voteVal);
    } else {
      if (voteVal === "Like") {
        setNumOfLikes(numOfLikes + 1);
        setNumOfDislikes(numOfDislikes - 1);
      } else if (voteVal === "Dislike") {
        setNumOfLikes(numOfLikes - 1);
        setNumOfDislikes(numOfDislikes + 1);
      }
      setVotingState(voteVal);
    }
  };

  // Debounced function to dispatch the action
  const handleLikeDislikePost = useCallback(
    debounce((postId, userAction) => {
      dispatch(likeDislikePost({ postId, userAction }));
    }, 1000), // 1 second debounce
    [dispatch]
  );

  useEffect(() => {
    if (user) {
      setVotingState(getInitialVotingState(likes, dislikes, user));
    }
  }, []);

  useEffect(() => {
    if (user && votingState !== null && votingState !== undefined) {
      if (getInitialVotingState(likes, dislikes, user) !== votingState) {
        handleLikeDislikePost(postId, votingState);
      }
    }
  }, [votingState]);

  const handleDeletePost = () => {
    dispatch(deletePost({ postId }));
  };

  return (
    <Card
      w={{ base: "sm", sm: "md", lg: "xl" }}
      border={"1px solid black"}
      _selection={{
        bgColor: "#111",
        color: "white",
      }}
      zIndex={1}
    >
      <CardBody>
        {/* <Image
          src="https://images.unsplash.com/photo-1621478374422-35206faeddfb?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bHVmZnl8ZW58MHx8MHx8fDA%3D"
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        /> */}
        <Stack mt="2" spacing="0">
          <Heading
            size="xl"
            className="post-title"
            fontFamily={`"Teko", sans-serif`}
            fontWeight={900}
            fontStyle={"normal"}
            textDecoration={"underline"}
            letterSpacing={0.5}
          >
            {cardTitle}
          </Heading>
          <Heading
            size="sm"
            className="post-location-detail"
            color={"grey"}
            textDecoration={"underline"}
            fontFamily={`"Teko", sans-serif`}
            fontWeight={500}
            fontStyle={"normal"}
            _selection={{
              bgColor: "gray",
              color: "white",
            }}
            letterSpacing={0.5}
          >
            {`${companyName || ""} ${companyLocation || ""}`}
          </Heading>
          <Collapse startingHeight={50} in={show}>
            <Text
              mt={2}
              size={"sm"}
              fontFamily={`"Teko", sans-serif`}
              fontWeight={400}
              letterSpacing={0.6}
              _selection={{
                bgColor: "#111",
                color: "white",
              }}
              whiteSpace={"pre-wrap"}
            >
              {cardContent}
            </Text>
          </Collapse>
          <Button
            size="sm"
            onClick={handleToggle}
            mt="1rem"
            colorScheme={"yellow"}
            fontFamily={`"Teko", sans-serif`}
            fontWeight={"700"}
          >
            Show {show ? "Less" : "More"}
          </Button>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <HStack w={"100%"} justifyContent={"space-between"}>
          <ButtonGroup spacing="2">
            <Button
              variant={"solid"}
              colorScheme="green"
              onClick={() => handleLikeDislikeState("Like")}
            >
              <Box mr={2}>
                {votingState === "Like" ? (
                  <RiThumbUpFill size={20} />
                ) : (
                  <RiThumbUpLine size={20} />
                )}
              </Box>
              {numOfLikes}
            </Button>
            <Button
              variant={votingState === "Dislike" ? "solid" : "outline"}
              colorScheme="red"
              onClick={() => handleLikeDislikeState("Dislike")}
            >
              <Box mr={2}>
                {votingState === "Dislike" ? (
                  <RiThumbDownFill size={20} />
                ) : (
                  <RiThumbDownLine size={20} />
                )}
              </Box>
              {numOfDislikes}
            </Button>
          </ButtonGroup>

          {user && postCreatedBy === user?._id && (
            <IconButton
              colorScheme="red"
              onClick={handleDeletePost}
              cursor={"pointer"}
            >
              <DeleteIcon />
            </IconButton>
          )}
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default Post;
