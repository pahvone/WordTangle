import { getByRole, render, screen } from "../../test-utils";
import LearnPage from "../LearnPage";

describe("learnpage", () => {
  describe("language header", () => {
    test("renders correctly", () => {
      render(<LearnPage />);
      const textElement = screen.getByRole("heading");
      expect(textElement).toBeInTheDocument();
    });
  });
});
