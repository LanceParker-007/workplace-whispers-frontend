import { VStack } from "@chakra-ui/react";
import Post from "../../components/post/Post";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/action/postsAction";

const AllPostsPage = () => {
  const givenString = `GSAP is a framework-agnostic JavaScript animation library that turns developers into animation superheroes. Build high-performance animations that work in every major browser. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects...anything JavaScript can touch! GSAP's ScrollTrigger plugin delivers jaw-dropping scroll-based animations with minimal code. gsap.matchMedia() makes building responsive, accessibility-friendly animations a breeze. 
    No other library delivers such advanced sequencing, reliability, and tight control while solving real-world problems on over 12 million sites. GSAP works around countless browser inconsistencies; your animations just work. At its core, GSAP is a high-speed property manipulator, updating values over time with extreme accuracy. It's up to 20x faster than jQuery!
GSAP is completely flexible; sprinkle it wherever you want. Zero dependencies.
There are many optional plugins and easing functions for achieving advanced effects easily like scrolling, morphing, animating along a motion path or FLIP animations. There's even a handy Observer for normalizing event detection across browsers/devices.`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPosts({}));
  }, []);

  return (
    <VStack padding={"5px"} width={"100%"}>
      {[800, 100, 600, 400, 500, 700, 200].map((cur) => (
        <Post
          key={cur}
          cardTitle={"Diwali Party"}
          cardSubtitle={"Hughes Systique Corp, Gurgaon"}
          cardContent={givenString.substring(0, cur)}
        />
      ))}
    </VStack>
  );
};

export default AllPostsPage;
