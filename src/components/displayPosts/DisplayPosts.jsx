import React, { useEffect } from "react";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
import { getAllPostsOfUser } from "../../redux/action/userAction";

const DisplayPosts = ({ userId }) => {
  const { posts } = useSelector((state) => state.userSliceReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) dispatch(getAllPostsOfUser({ userId }));
  }, [userId, dispatch]);

  console.log(posts);

  return (
    <Box mx={"auto"}>
      {posts?.map((post) => (
        <Post
          key={post?._id}
          cardTitle={post?.title}
          cardSubtitle={`${post?.companyName}, ${post?.companyLocation}`}
          cardContent={post?.content}
        />
      ))}
    </Box>
  );
};

export default DisplayPosts;
