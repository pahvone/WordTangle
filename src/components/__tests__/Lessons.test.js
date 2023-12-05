import { getByRole, render, screen } from "../../test-utils";
import Lessons from "../Lessons";

describe("lessons", () => {
describe("lesson 1 button", () => {
    test("renders correctly", () => {
      render(<Lessons />);
      const buttonElement = screen.getByRole("button", { name: "Numbers 1" });
      expect(buttonElement).toBeInTheDocument();
    });
  });
})