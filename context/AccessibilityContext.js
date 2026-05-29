import React, { createContext, useContext, useState } from 'react';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [altoContraste, setAltoContraste] = useState(false);
  const [fonteGrande, setFonteGrande] = useState(false);

  return (
    <AccessibilityContext.Provider value={{ altoContraste, fonteGrande, setAltoContraste, setFonteGrande }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  return useContext(AccessibilityContext);
}
