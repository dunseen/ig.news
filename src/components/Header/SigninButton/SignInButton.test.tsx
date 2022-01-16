import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/client";
import { mocked } from "ts-jest/utils";
import { SignInButton } from "./index";

jest.mock("next-auth/client");

describe("SignInButton component", () => {
  it("should be able to renders correctly when user is NOT authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([null, false]);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with GitHub")).toBeInTheDocument();
  });

  it("should be able to renders correctly when user is authenticated", () => {
    const useSessionMocked = mocked(useSession);
    useSessionMocked.mockReturnValueOnce([
      {
        user: { name: "Jhon Doe", email: "jhon@example.com" },
        expires: "mocked-expires",
      },
      false,
    ]);

    render(<SignInButton />);

    expect(screen.getByText("Jhon Doe")).toBeInTheDocument();
  });
});
