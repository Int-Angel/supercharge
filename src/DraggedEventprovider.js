import React, { createContext, useContext, useState } from "react";

const DraggedEventContext = createContext();

export const useDraggedEvent = () => {
  return useContext(DraggedEventContext);
};

export const DraggedEventProvider = ({ children }) => {
  const [draggedEvent, setDraggedEvent] = useState(null); // Initialize with a default value

  return (
    <DraggedEventContext.Provider value={{ draggedEvent, setDraggedEvent }}>
      {children}
    </DraggedEventContext.Provider>
  );
};