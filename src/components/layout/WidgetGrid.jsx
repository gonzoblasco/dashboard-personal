// src/components/layout/WidgetGrid.jsx
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
  arrayMove
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useUserPreferences } from "../../context/UserPreferencesContext";

// Regular CSS classes
const gridStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "20px",
  padding: "20px"
};

// Wrapper for sortable items with animated styles
const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    position: "relative",
    zIndex: isDragging ? 1 : 0
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

const WidgetGrid = ({ children, onOrderChange }) => {
  const { preferences } = useUserPreferences();
  const { theme } = preferences;
  const [activeId, setActiveId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  // Add window resize listener
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // Extract widget IDs from children
  const items = React.Children.map(children, child => child.key);
  
  // Create a map of components by ID for the overlay
  const componentsById = {};
  React.Children.forEach(children, child => {
    componentsById[child.key] = child;
  });
  
  // Set up sensors for mouse, touch, and keyboard
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Handle drag start
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      // Find the indices of the dragged item and the drop target
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      
      // Update the order
      const newOrder = arrayMove(items, oldIndex, newIndex);
      
      // Call the callback to update the parent state
      if (onOrderChange) {
        onOrderChange(newOrder);
      }
    }
    
    // Reset active ID
    setActiveId(null);
  };

  // Style for overlay content
  const dragOverlayStyle = {
    transform: "rotate(-2deg) scale(0.95)",
    opacity: 0.8,
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)",
    backgroundColor: theme === 'dark' ? '#333' : '#fff',
    borderRadius: "8px",
    padding: "16px",
    width: "250px",
    pointerEvents: "none",
    userSelect: "none",
    position: "relative"
  };

  // Label for dragging
  const dragLabelStyle = {
    display: "block",
    padding: "8px",
    textAlign: "center",
    fontWeight: "bold",
    color: theme === 'dark' ? '#fff' : '#333',
    backgroundColor: theme === 'dark' ? '#222' : '#f5f5f5',
    borderRadius: "4px 4px 0 0",
    margin: "-16px -16px 8px -16px"
  };

  // Apply responsive styles for mobile and tablet
  const responsiveGridStyles = {
    ...gridStyles,
    ...(windowWidth <= 1200 && windowWidth > 768 ? { gridTemplateColumns: "repeat(2, 1fr)" } : {}),
    ...(windowWidth <= 768 ? { gridTemplateColumns: "1fr" } : {})
  };

  return (
    <DndContext 
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={rectSortingStrategy}>
        <div style={responsiveGridStyles}>
          {React.Children.map(children, child => (
            <SortableItem id={child.key}>
              {child}
            </SortableItem>
          ))}
        </div>
      </SortableContext>
      
      {/* Drag overlay for visual feedback */}
      <DragOverlay>
        {activeId ? (
          <div style={dragOverlayStyle}>
            <div style={dragLabelStyle}>Moving</div>
            {componentsById[activeId]}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default WidgetGrid;
