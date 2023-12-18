import { render, screen } from "../../test-utils";
import Usernamechange from "../UsernameChange";

describe("password change", () => {
  describe("logo", () => {
    test("renders correctly", () => {
      render(<Usernamechange />);
      expect(screen.getByAltText("Word Tangle Logo")).toBeInTheDocument();
    });
  });
  describe("nickname label", () => {
    test("renders correctly", () => {
      render(<Usernamechange />);
      expect(screen.getByText("Nickname")).toBeInTheDocument();
    });
  });
  describe("nickname input field", () => {
    test("renders correctly", () => {
      render(<Usernamechange />);
      expect(
        screen.getByRole("textbox", { name: "Nickname" }),
      ).toBeInTheDocument();
    });
  });
  describe("nickname update button", () => {
    test("renders correctly", () => {
      render(<Usernamechange />);
      expect(
        screen.getByRole("button", { name: "Update Nickname" }),
      ).toBeInTheDocument();
    });
  });
});
