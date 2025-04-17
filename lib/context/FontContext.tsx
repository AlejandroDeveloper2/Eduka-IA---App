import { createContext, useContext } from "react";

interface FontContextProps {
  fontsLoaded: boolean;
}

const FontContext = createContext<FontContextProps>({ fontsLoaded: false });

export const useFont = () => useContext(FontContext);

export const FontProvider = ({
  children,
  fontsLoaded,
}: {
  children: React.ReactNode;
  fontsLoaded: boolean;
}) => {
  return (
    <FontContext.Provider value={{ fontsLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
