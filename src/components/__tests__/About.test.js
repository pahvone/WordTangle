import { screen, render } from "../../test-utils";
import About from "../About";

describe("about", () => {
  describe("header", () => {
    test("renders correctly", () => {
      render(<About />);
      const textElement = screen.getByRole("heading");
      expect(textElement).toBeInTheDocument();
    });
  });
  describe("serious company logo", () => {
    test("renders correctly", () => {
      render(<About />);
      const imageElement = screen.getByAltText(/code goblins logo/i);
      expect(imageElement).toBeInTheDocument();
    });
  });
});
