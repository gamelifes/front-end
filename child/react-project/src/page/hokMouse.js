import React, { useState, useEffect } from 'react'
export default () => {
  const [positionX, setPositionX] = useState(0)
  const [positionY, setPositionY] = useState(0)
  const getMousePosition = (e) => {
    setPositionX(e.clientX)
    setPositionY(e.clientY)
  }
  useEffect(() => {
    document.addEventListener('mousemove', getMousePosition)
    return () => {
      document.removeEventListener('mousemove', getMousePosition)
    };
  });
  return {
    positionX: positionX,
    positionY: positionY
  }
}