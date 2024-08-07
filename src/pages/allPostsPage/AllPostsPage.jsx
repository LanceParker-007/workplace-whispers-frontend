import { VStack } from "@chakra-ui/react";
import Post from "../../components/post/Post";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/action/postsAction";
import DisplayPosts from "../../components/displayPosts/DisplayPosts";

const AllPostsPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("here");

    dispatch(getAllPosts({}));
  }, []);

  return <DisplayPosts />;
};

export default AllPostsPage;
