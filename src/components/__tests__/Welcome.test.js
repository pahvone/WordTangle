import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";

import Welcome from "../Welcome";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("welcome", () => {
  describe("logo", () => {
    test("renders correctly", () => {
      render(<Welcome />);
      const imageElement = screen.getByAltText(/logo/i);
      expect(imageElement).toBeInTheDocument();
    });
  });
  describe("slogan", () => {
    test("renders correctly", () => {
      render(<Welcome />);
      const textElement = screen.getByText(/tangled with words/i);
      expect(textElement).toBeInTheDocument();
    });
  });
  describe("login button", () => {
    test("renders correctly", () => {
      render(<Welcome />);
      const buttonElement = screen.getByRole("button", { name: "Login" });
      expect(buttonElement).toBeInTheDocument();
    });
    test("routes to /Login correctly", async () => {
      user.setup();
      render(<Welcome />);
      const buttonElement = screen.getByRole("button", { name: "Login" });
      await user.click(buttonElement);
      expect(mockedNavigate).toHaveBeenCalledWith("/Login");
    });
  });
  describe("signup button", () => {
    test("renders correctly", () => {
      render(<Welcome />);
      const buttonElement = screen.getByRole("button", { name: "Sign Up" });
      expect(buttonElement).toBeInTheDocument();
    });
    test("routes to /signup correctly", async () => {
      user.setup();
      render(<Welcome />);
      const buttonElement = screen.getByRole("button", { name: "Sign Up" });
      await user.click(buttonElement);
      expect(mockedNavigate).toHaveBeenCalledWith("/signup");
    });
  });
});
