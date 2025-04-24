import { createContext, useState, useContext, ReactNode } from "react";
import { View } from "react-native";

interface PortalContextProps {
  show: (element: React.ReactNode) => void;
  hide: (element: React.ReactNode) => void;
}

const PortalContext = createContext<PortalContextProps>({
  show: () => {},
  hide: () => {},
});

export const usePortal = () => useContext(PortalContext);

export const PortalProvider = ({ children }: { children: ReactNode }) => {
  const [elements, setElements] = useState<ReactNode[]>([]);

  const show = (element: React.ReactNode) => {
    setElements((prev) => [...prev, element]);
  };

  const hide = (element: React.ReactNode) => {
    setElements((prev) => prev.filter((el) => el !== element));
  };

  return (
    <PortalContext.Provider value={{ show, hide }}>
      {children}
      {elements.map((el, i) => (
        <View
          key={i}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        >
          {el}
        </View>
      ))}
    </PortalContext.Provider>
  );
};
