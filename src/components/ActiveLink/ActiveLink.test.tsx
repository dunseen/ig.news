import { render, screen } from "@testing-library/react";
import { ActiveLink } from "./index";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        asPath: "/",
      };
    },
  };
});

describe("ActiveLink component", () => {
  it("should be able to renders correctly", () => {
    render(
      <ActiveLink href="/" activeClassname="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should be able to receive active class", () => {
    render(
      <ActiveLink href="/" activeClassname="active">
        <a>Home</a>
      </ActiveLink>
    );

    expect(screen.getByText("Home")).toHaveClass("active");
  });
});
