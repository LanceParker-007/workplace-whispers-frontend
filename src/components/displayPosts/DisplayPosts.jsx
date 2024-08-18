import React, { useEffect } from "react";
import Post from "../post/Post";
import { useDispatch, useSelector } from "react-redux";
import { HStack, VStack } from "@chakra-ui/react";
import { getAllPostsOfUser } from "../../redux/action/userAction";
import { setCurrentPage, setMessageEmpty } from "../../redux/slice/userSlice";
import FullScreenLoader from "../loaders/FullScreenLoader";

const DisplayPosts = ({ userId }) => {
  const { posts, totalPages, currentPage, isLoading, message } = useSelector(
    (state) => state.userSliceReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      dispatch(getAllPostsOfUser({ userId, page: currentPage }));
      dispatch(setCurrentPage(currentPage + 1));
    }
  }, []);

  const fetchMorePosts = () => {
    if (!isLoading && currentPage <= totalPages) {
      dispatch(getAllPostsOfUser({ userId, page: currentPage }));
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  // fetch posts because of intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMorePosts();
        }
      },
      { threshold: 0.1 }
    );

    const target = document.querySelector("#loadMoreTrigger");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [currentPage, totalPages, isLoading]);

  // Remove Intersection oberver
  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      const target = document.querySelector("#loadMoreTrigger");
      if (target) target.style.display = "none"; // Hide the trigger when no more pages
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    if (message) {
      dispatch(getAllPostsOfUser({ userId, page: 1 }));
      dispatch(setCurrentPage(1));
      dispatch(setMessageEmpty());
    }
  }, [message]);

  if (isLoading || !userId) return <FullScreenLoader />;

  return (
    <VStack mx={"auto"} padding={"5px"}>
      {posts?.map((post) => (
        <Post key={post?._id} postData={post} />
      ))}
      {isLoading && <HStack color={"white"}>Loading...</HStack>}
      <div id="loadMoreTrigger"></div>{" "}
    </VStack>
  );
};

export default DisplayPosts;
