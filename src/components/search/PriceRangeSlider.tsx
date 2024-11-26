import React, { useState, useEffect, useRef } from "react";

interface TwoHandleSliderProps {
  min: number;
  max: number;
  currentMin: number;
  currentMax: number;
  step?: number;
  onChange?: (min: number, max: number) => void;
}

const PriceRangeSlider: React.FC<TwoHandleSliderProps> = ({
  min,
  max,
  currentMin,
  currentMax,
  step = 1,
  onChange,
}) => {
  const [leftValue, setLeftValue] = useState(currentMin);
  const [rightValue, setRightValue] = useState(currentMax);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent, isLeft: boolean) => {
    if (!sliderRef.current) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    const value = Math.round((percent * (max - min) + min) / step) * step;

    if (isLeft) {
      if (value < rightValue && value >= min) setLeftValue(value);
    } else {
      if (value > leftValue && value <= max) setRightValue(value);
    }
  };

  useEffect(() => {
    setLeftValue(currentMin)
    setRightValue(currentMax)
  }, [currentMax, currentMin])

  useEffect(() => {
    onChange?.(leftValue, rightValue);
  }, [leftValue, rightValue, onChange]);

  const leftPercent = ((leftValue - min) / (max - min)) * 100;
  const rightPercent = ((rightValue - min) / (max - min)) * 100;

  return (
    <div>
      <div className="relative w-full h-6">
        <div
          ref={sliderRef}
          className="absolute top-1/2 left-0 right-0 h-2 bg-gray-300 rounded-full transform -translate-y-1/2"
        >
          <div
            className="absolute h-full bg-main-blue rounded-full"
            style={{ left: `${leftPercent}%`, right: `${100 - rightPercent}%` }}
          ></div>
        </div>
        <button
          className="absolute top-0 w-6 h-6 bg-white border-2 border-main-blue-s3 rounded-full shadow cursor-pointer transform -translate-x-1/2 focus:outline-none"
          style={{ left: `${leftPercent}%` }}
          onMouseDown={(e) => {
            const moveHandler = (event: MouseEvent) => handleMove(event, true);
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener(
              "mouseup",
              () => {
                document.removeEventListener("mousemove", moveHandler);
              },
              { once: true }
            );
          }}
        ></button>
        <button
          className="absolute top-0 w-6 h-6 bg-white border-2 border-main-blue-s3 rounded-full shadow cursor-pointer transform -translate-x-1/2 focus:outline-none"
          style={{ left: `${rightPercent}%` }}
          onMouseDown={(e) => {
            const moveHandler = (event: MouseEvent) => handleMove(event, false);
            document.addEventListener("mousemove", moveHandler);
            document.addEventListener(
              "mouseup",
              () => {
                document.removeEventListener("mousemove", moveHandler);
              },
              { once: true }
            );
          }}
        ></button>
      </div>
      <div className="w-full flex justify-between text-main-blue-s3 font-semibold">
        <span>{Number(leftValue).toLocaleString()} đ</span>
        <span>{Number(rightValue).toLocaleString()} đ</span>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
