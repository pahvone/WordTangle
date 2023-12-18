import { render, screen } from "../../test-utils";
import PasswordChange from "../PasswordChange";

describe("password change", () => {
  describe("logo", () => {
    test("renders correctly", () => {
      render(<PasswordChange />);
      expect(screen.getByAltText("Word Tangle Logo")).toBeInTheDocument();
    });
  });
  describe("nickname label", () => {
    test("renders correctly", () => {
      render(<PasswordChange />);
      expect(screen.getByText("New Password")).toBeInTheDocument();
    });
  });
  describe("nickname input field", () => {
    test("renders correctly", () => {
      render(<PasswordChange />);
      expect(
        screen.getByRole("textbox", { name: "New Password" }),
      ).toBeInTheDocument();
    });
  });
  describe("nickname update button", () => {
    test("renders correctly", () => {
      render(<PasswordChange />);
      expect(
        screen.getByRole("button", { name: "Update Password" }),
      ).toBeInTheDocument();
    });
  });
});
