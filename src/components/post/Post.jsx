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
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { likeDislikePost } from "../../redux/action/postsAction";

const Post = ({ cardTitle, cardSubtitle, cardContent }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // Handle voting: Either Like or Dislike or none
  const [votingState, setVotingState] = useState("");
  const [numOfUpvotes, setNumOfUpvotes] = useState(55);
  const [numOfDownvotes, setNumOfDownvotes] = useState(5);

  const dispatch = useDispatch();

  const handleVoting = (voteVal) => {
    if (votingState === voteVal) {
      setVotingState("");
      if (voteVal === "Like") setNumOfUpvotes(numOfUpvotes - 1);
      else if (voteVal === "Dislike") setNumOfDownvotes(numOfDownvotes - 1);
    } else if (!votingState) {
      if (voteVal === "Like") {
        setNumOfUpvotes(numOfUpvotes + 1);
      } else if (voteVal === "Dislike") {
        setNumOfDownvotes(numOfDownvotes + 1);
      }
      setVotingState(voteVal);
    } else {
      if (voteVal === "Like") {
        setNumOfUpvotes(numOfUpvotes + 1);
        setNumOfDownvotes(numOfDownvotes - 1);
      } else if (voteVal === "Dislike") {
        setNumOfUpvotes(numOfUpvotes - 1);
        setNumOfDownvotes(numOfDownvotes + 1);
      }
      setVotingState(voteVal);
    }
  };

  useEffect(() => {
    if (votingState)
      dispatch(likeDislikePost({ postId: "", userAction: votingState }));
  }, [dispatch, votingState]);

  return (
    <Card
      maxw={"xl"}
      minW={"sm"}
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
            {cardSubtitle}
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
              onClick={() => handleVoting("Like")}
            >
              <Box mr={2}>
                {votingState === "Like" ? (
                  <RiThumbUpFill size={20} />
                ) : (
                  <RiThumbUpLine size={20} />
                )}
              </Box>
              {numOfUpvotes}
            </Button>
            <Button
              variant={votingState === "Dislike" ? "solid" : "outline"}
              colorScheme="red"
              onClick={() => handleVoting("Dislike")}
            >
              <Box mr={2}>
                {votingState === "Dislike" ? (
                  <RiThumbDownFill size={20} />
                ) : (
                  <RiThumbDownLine size={20} />
                )}
              </Box>
              {numOfDownvotes}
            </Button>
          </ButtonGroup>

          <Button variant="outline" colorScheme="green">
            {" "}
            <EditIcon />
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};

export default Post;
