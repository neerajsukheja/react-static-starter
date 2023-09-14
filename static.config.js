import axios from "axios";

export default {
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      "https://neerajsukheja.com/api/response.json"
    );
    return [
      {
        path: "/",
        component: "src/containers/Home",
      },
      {
        path: "/about",
        component: "src/containers/About",
      },
      {
        path: "/blog",
        component: "src/containers/Blog",
        getData: () => ({
          posts,
        }),
        children: posts.map((post) => ({
          path: `/post/${post.id}`,
          component: "src/containers/Post",
          getData: () => ({
            post,
          }),
        })),
      },
      {
        is404: true,
        component: "src/containers/404",
      },
    ];
  },
};
