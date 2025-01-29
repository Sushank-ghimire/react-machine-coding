import { useTheme } from "./ThemeContextProvider";
import styles from "./theme.module.css";

const ThemeChange = () => {
  const { toggleTheme } = useTheme();
  return (
    <div className={styles.container}>
      <button onClick={toggleTheme} className={styles.button}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeChange;
