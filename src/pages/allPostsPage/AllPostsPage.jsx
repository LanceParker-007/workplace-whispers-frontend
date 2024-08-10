import { VStack } from "@chakra-ui/react";
import Post from "../../components/post/Post";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/action/postsAction";

const AllPostsPage = () => {
  const { posts } = useSelector((state) => state.postsSliceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts({}));
  }, [dispatch]);

  return (
    <VStack padding={"5px"} width={"100%"}>
      {posts?.map((post) => (
        <Post
          key={post?._id}
          cardTitle={post?.title}
          cardSubtitle={`${post?.companyName}, ${post?.companyLocation}`}
          cardContent={post?.content}
        />
      ))}
    </VStack>
  );
};

export default AllPostsPage;
