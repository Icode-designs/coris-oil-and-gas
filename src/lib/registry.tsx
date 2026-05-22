"use client";

import React, { useState, useEffect } from "react";
import { StyleSheetManager } from "styled-components";

function shouldForwardProp(prop: string): boolean {
  return !prop.startsWith("$");
}

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      {children}
    </StyleSheetManager>
  );
}
