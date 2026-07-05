import { createContext, useContext, useState, useCallback } from "react";

const HoveredSkillContext = createContext({
  hoveredSkill: null,
  setHoveredSkill: () => {},
});

export function HoveredSkillProvider({ children }) {
  const [hoveredSkill, setHoveredSkillRaw] = useState(null);

  const setHoveredSkill = useCallback((skill) => {
    setHoveredSkillRaw(skill);
  }, []);

  return (
    <HoveredSkillContext.Provider value={{ hoveredSkill, setHoveredSkill }}>
      {children}
    </HoveredSkillContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useHoveredSkill = () => useContext(HoveredSkillContext);
