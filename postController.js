const posts = [
  { id: 1, title: "Post One" },
  { id: 2, title: "Post Two" },
];

// export const getPosts = () => posts; // can be exported like this
const getPosts = () => posts;
// export { getPosts }; // as well as like this

export const getPostsLength = () => posts.length; // in case another function needs to be exported this is how to

export default getPosts; // default is mostly used when only one function is being exported from a file