import { HStack, VStack } from "@chakra-ui/react";
import Post from "../../components/post/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/action/postsAction";
import { setCurrentPage } from "../../redux/slice/postsSlice";
import FullScreenLoader from "../../components/loaders/FullScreenLoader";

const AllPostsPage = () => {
  const { posts, totalPages, currentPage, isLoading } = useSelector(
    (state) => state.postsSliceReducer
  );
  const dispatch = useDispatch();

  // Initial fetch posts
  useEffect(() => {
    dispatch(getAllPosts({ page: currentPage }));
    dispatch(setCurrentPage(currentPage + 1));
  }, []);

  const fetchMorePosts = () => {
    if (!isLoading && currentPage <= totalPages) {
      dispatch(getAllPosts({ page: currentPage }));
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

  if (isLoading) return <FullScreenLoader />;

  return (
    <VStack padding={"5px"} width={"100%"}>
      {posts?.map((post) => (
        <Post key={post?._id} postData={post} />
      ))}
      {isLoading && <HStack color={"white"}>Loading...</HStack>}
      <div id="loadMoreTrigger"></div>{" "}
    </VStack>
  );
};

export default AllPostsPage;
