import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import Login from "../Login";

// const mockedNavigate = jest.fn();

// const authMock = jest.fn(() => {

// })

// jest.mock('react-router-dom', () => ({
//    ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedNavigate,
// }));

describe("Login", () => {
  describe("word tangle logo", () => {
    test("renders correctly", () => {
      render(<Login />);
      const imageElement = screen.getByAltText(/word tangle logo/i);
      expect(imageElement).toBeInTheDocument();
    });
  });
  describe("email label", () => {
    test("renders correctly", () => {
      render(<Login />);
      const textElement = screen.getByText(/email/i);
      expect(textElement).toBeInTheDocument();
    });
  });
  describe("email input box", () => {
    test("renders correctly", () => {
      render(<Login />);
      const textInputElement = screen.getByRole("textbox", { name: "Email" });
      expect(textInputElement).toBeInTheDocument();
    });
  });
  describe("password label", () => {
    test("renders correctly", () => {
      render(<Login />);
      const textElement = screen.getByText("Password");
      expect(textElement).toBeInTheDocument();
    });
  });
  describe("password input box", () => {
    test("renders correctly", () => {
      render(<Login />);
      const textInputElement = screen.getByRole("textbox", {
        name: "Password",
      });
      expect(textInputElement).toBeInTheDocument();
    });
  });
  describe("login button", () => {
    test("renders correctly", () => {
      render(<Login />);
      const buttonElement = screen.getByRole("button", { name: "Login" });
      expect(buttonElement).toBeInTheDocument();
    });
  });
  describe("forgot password button", () => {
    test("renders correctly", () => {
      render(<Login />);
      const buttonElement = screen.getByRole("button", { name: /forgot/i });
      expect(buttonElement).toBeInTheDocument();
    });
  });
  describe("alternate login label", () => {
    test("renders correctly", () => {
      render(<Login />);
      const textElement = screen.getByText(/or log in/i);
      expect(textElement).toBeInTheDocument();
    });
  });
  describe("google logo", () => {
    test("renders correctly", () => {
      render(<Login />);
      const imageElement = screen.getByAltText(/google logo/i);
      expect(imageElement).toBeInTheDocument();
    });
  });
});
