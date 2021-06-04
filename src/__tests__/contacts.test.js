import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { rest } from "msw";
import { Contacts } from "../pages/Contacts";
import { serverTests } from "../serverTests";
import userEvent from "@testing-library/user-event";

beforeAll(() => serverTests.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => serverTests.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => serverTests.close());

describe(`contacts get data`, () => {
  test(`loading`, async () => {
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");
    expect(loader).toBeInTheDocument();
    await waitForElementToBeRemoved(loader);
  });

  test(`success`, async () => {
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();

    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
  });
  test(`error`, async () => {
    serverTests.use(
      rest.get("https://randomuser.me/api/?results=20", (req, res, ctx) => {
        return res(
          ctx.status(500),
          ctx.json({
            error: "Internal Server Error",
          })
        );
      })
    );
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(loader).not.toBeInTheDocument();

    expect(screen.getByTestId("contacts-error")).toBeInTheDocument();
  });
});
describe(`contacts data view mode`, () => {
  test(`should equal table`, async () => {
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(screen.getByTestId("contacts-table-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-grid-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test(`should equal grid`, async () => {
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    const toggleGrid = screen.queryByTestId("toggle-data-view-mode-grid");

    userEvent.click(toggleGrid);

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
  });

  test(`should equal grid with reload page`, async () => {
    window.localStorage.setItem("dataViewMode", "grid");
    render(<Contacts />);
    screen.debug();
    const loader = screen.getByTestId("contacts-loader");

    await waitForElementToBeRemoved(loader);

    expect(screen.getByTestId("contacts-grid-container")).toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-grid")).toHaveClass(
      "Mui-selected"
    );

    expect(
      screen.queryByTestId("contacts-table-container")
    ).not.toBeInTheDocument();
    expect(screen.getByTestId("toggle-data-view-mode-table")).not.toHaveClass(
      "Mui-selected"
    );
  });
});
