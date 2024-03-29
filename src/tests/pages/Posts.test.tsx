import { screen, render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts";
import { getPrismicClient } from "../../services/prismic";

const posts = [
  {
    slug: "my-new-post",
    title: "My new post",
    excerpt: "Post excerpt",
    updatedAt: "28 de dezembro",
  },
];

jest.mock("../../services/prismic");

describe("Posts Page", () => {
  it("should be to renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
  });

  it("should be to loads initial data", async () => {
    const getPrismicClientMocked = mocked(getPrismicClient);

    getPrismicClientMocked.mockReturnValueOnce({
      query: jest.fn().mockReturnValueOnce({
        results: [
          {
            uid: "my-new-post",
            data: {
              title: [{ type: "heading", text: "My new post" }],
              content: [{ type: "paragraph", text: "Post excerpt" }],
            },
            last_publication_date: "12-28-2021",
          },
        ],
      }),
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "my-new-post",
              title: "My new post",
              excerpt: "Post excerpt",
              updatedAt: "28 de dezembro de 2021",
            },
          ],
        },
      })
    );
  });
});
