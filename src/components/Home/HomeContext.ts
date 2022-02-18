import React, { useState, useEffect, ReactNode, useContext } from "react";

type HomeContext = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  progress: number;
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  isLoaded: boolean;
  setIsLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
const HomeContext = React.createContext<HomeContext>(null!);

export default HomeContext;
