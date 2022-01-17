import { screen, render } from "@testing-library/react";
import { getSession, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { mocked } from "ts-jest/utils";
import Posts, { getStaticProps } from "../../pages/posts/preview/[slug]";
import { getPrismicClient } from "../../services/prismic";

const post = {
  slug: "my-new-post",
  title: "My new post",
  content: "<p>Post excerpt</p>",
  updatedAt: "28 de dezembro de 2021",
};

jest.mock("../../services/prismic");
jest.mock("next/router");
jest.mock("next-auth/client");

describe("Post preview Page", () => {
  it("should be to renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<Posts post={post} />);

    expect(screen.getByText("My new post")).toBeInTheDocument();
    expect(screen.getByText("Post excerpt")).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading ?")).toBeInTheDocument();
  });

  //   it("redirects user to full post when user is subscribed", async () => {
  //     const useSessionMocked = mocked(useSession);
  //     const useRouterMocked = mocked(useRouter);
  //     const pushMocked = jest.fn();

  //     useSessionMocked.mockReturnValueOnce([
  //       { activeSubscription: "fake-subscription" },
  //       false,
  //     ] as any);

  //     useRouterMocked.mockReturnValueOnce({
  //       push: pushMocked,
  //     } as any);

  //     render(<Posts post={post} />);

  //     expect(pushMocked).toHaveBeenCalledWith("/posts/my-new-post");
  //   });

  //   it("loads initial data", async () => {
  //     const getSessionMocked = mocked(getSession);
  //     const getPrismicClientMocked = mocked(getPrismicClient);

  //     getPrismicClientMocked.mockReturnValueOnce({
  //       getByUID: jest.fn().mockResolvedValueOnce({
  //         data: {
  //           title: [{ type: "heading", text: "My new post" }],
  //           content: [{ type: "paragraph", text: "Post content" }],
  //         },
  //         last_publication_date: "04-01-2021",
  //       }),
  //     } as any);
  //     getSessionMocked.mockResolvedValueOnce({
  //       activeSubscription: "fake-subscription",
  //     } as any);

  //     const response = await getServerSideProps({
  //       params: { slug: "my-new-post" },
  //     } as any);

  //     expect(response).toEqual(
  //       expect.objectContaining({
  //         props: {
  //           post: {
  //             slug: "my-new-post",
  //             title: "My new post",
  //             content: "<p>Post content</p>",
  //             updatedAt: "01 de abril de 2021",
  //           },
  //         },
  //       })
  //     );
  //   });
});
