// src/hooks/useLocalData.js
import { useState, useEffect } from "react";

const useLocalData = (initialData, storageKey) => {
  // Intentar obtener datos del localStorage o usar los iniciales
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem(storageKey);
    return savedData ? JSON.parse(savedData) : initialData;
  });

  // Sincronizar con localStorage cuando los datos cambien
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data, storageKey]);

  return [data, setData];
};

export default useLocalData;
