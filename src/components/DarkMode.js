import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Toggle from "react-toggle";

const DarkMode = () => {

    const [isDark, setIsDark] = useState(true);
    
    const systemPrefersDark = useMediaQuery(
      {
        query: "(prefers-color-scheme: dark)",
      },
      undefined,
      (isSystemDark) => setIsDark(isSystemDark),
    );
  
    useEffect(() => {
      if (isDark) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }, [isDark]);

    return(
        <Toggle
        checked={isDark}
        onChange={({ target }) => setIsDark(target.checked)}
        icons={{ checked: "🌙", unchecked: "🔆" }}
        aria-label="Dark mode toggle"
      />
    )
}

export default DarkMode