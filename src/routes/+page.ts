import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  return {
    post: {
      title: `Title for ${params} goes here`,
      content: `Content for ${params} goes here`,
    },
  };
};
