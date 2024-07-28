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
} from "@chakra-ui/react";
import { useGSAP } from "@gsap/react";
import {
  RiArrowDownFill,
  RiArrowUpFill,
  RiEdit2Fill,
  RiEdit2Line,
} from "@remixicon/react";
import gsap from "gsap";
import React, { useRef, useState } from "react";
import { EditIcon } from "@chakra-ui/icons";

const Post = ({ cardTitle, cardSubtitle, cardContent }) => {
  const [show, setShow] = useState(false);
  const handleToggle = () => setShow(!show);

  // Handle voting: Either upvote or downvote or none
  const [votingState, setVotingState] = useState("");
  const [numOfUpvotes, setNumOfUpvotes] = useState(55);
  const [numOfDownvotes, setNumOfDownvotes] = useState(5);

  const handleVoting = (voteVal) => {
    if (votingState === voteVal) {
      setVotingState("");
      if (voteVal === "upvote") setNumOfUpvotes(numOfUpvotes - 1);
      else if (voteVal === "downvote") setNumOfDownvotes(numOfDownvotes - 1);
    } else if (!votingState) {
      if (voteVal === "upvote") {
        setNumOfUpvotes(numOfUpvotes + 1);
      } else if (voteVal === "downvote") {
        setNumOfDownvotes(numOfDownvotes + 1);
      }
      setVotingState(voteVal);
    } else {
      if (voteVal === "upvote") {
        setNumOfUpvotes(numOfUpvotes + 1);
        setNumOfDownvotes(numOfDownvotes - 1);
      } else if (voteVal === "downvote") {
        setNumOfUpvotes(numOfUpvotes - 1);
        setNumOfDownvotes(numOfDownvotes + 1);
      }
      setVotingState(voteVal);
    }

    // TODO: Handle API calling to save to this data
  };

  return (
    <Card
      w={{ sm: "xl" }}
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
              variant={votingState === "upvote" ? "solid" : "outline"}
              colorScheme="green"
              onClick={() => handleVoting("upvote")}
            >
              <RiArrowUpFill size={25} />
              {numOfUpvotes}
              {/* Number of upvotes */}
            </Button>
            <Button
              variant={votingState === "downvote" ? "solid" : "outline"}
              colorScheme="orange"
              onClick={() => handleVoting("downvote")}
            >
              <RiArrowDownFill size={25} />
              {numOfDownvotes}
              {/* Number of downvotes */}
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
