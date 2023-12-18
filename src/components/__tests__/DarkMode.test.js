import { render, screen } from "../../test-utils";
import user from "@testing-library/user-event";
import DarkMode from "../DarkMode";

describe("dark mode toggle", () => {
  test("renders correctly", () => {
    render(<DarkMode />);
    const toggleElement = screen.getByLabelText(/dark mode/i);
    expect(toggleElement).toBeInTheDocument();
  });
  test("toggles correctly", async () => {
    user.setup();
    render(<DarkMode />);
    const toggleElement = screen.getByLabelText(/dark mode/i);
    let themeMode = document.body.getAttribute("class");
    expect(themeMode).toEqual("dark");
    await user.click(toggleElement);
    themeMode = document.body.getAttribute("class");
    expect(themeMode).not.toEqual("dark");
    await user.click(toggleElement);
    themeMode = document.body.getAttribute("class");
    expect(themeMode).toEqual("dark");
  });
});
