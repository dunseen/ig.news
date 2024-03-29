import { screen, render } from "@testing-library/react";
import { mocked } from "ts-jest/utils";
import { stripe } from "../../services/stripe";
import Home, { getStaticProps } from "../../pages/index";

jest.mock("next/router");
jest.mock("next-auth/client", () => {
  return {
    useSession: () => [null, false],
  };
});

jest.mock("../../services/stripe");

describe("Home Page", () => {
  it("should be renders correctly", () => {
    render(<Home product={{ priceId: "fake-priceID", amount: "R$100,00" }} />);

    expect(screen.getByText("for R$100,00 month")).toBeInTheDocument();
  });

  it("should be loads initial data", async () => {
    const retrieveStripePricesMocked = mocked(stripe.prices.retrieve);
    retrieveStripePricesMocked.mockResolvedValueOnce({
      id: "fake-price-id",
      unit_amount: 10000,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fake-price-id",
            amount: "$100.00",
          },
        },
      })
    );
  });
});
