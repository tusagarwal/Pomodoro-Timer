/*
 * Length Settings Component
 * 
 * This component allows users to configure the duration of:
 * - Work sessions (Pomodoro)
 * - Short breaks
 * - Long breaks
 * 
 * Features:
 * - Increment/decrement buttons for each setting
 * - Visual display of current values
 * - Disabled state when timer is running
 */

import React from 'react';
import Button from './Button';

interface LengthSettingProps {
  workLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  onWorkLengthChange: (length: number) => void;
  onShortBreakLengthChange: (length: number) => void;
  onLongBreakLengthChange: (length: number) => void;
  disabled?: boolean;
}

const LengthSetting: React.FC<LengthSettingProps> = ({
  workLength,
  shortBreakLength,
  longBreakLength,
  onWorkLengthChange,
  onShortBreakLengthChange,
  onLongBreakLengthChange,
  disabled = false
}) => {
  const SettingRow = ({ 
    label, 
    value, 
    onDecrease, 
    onIncrease, 
    min = 1, 
    max = 60 
  }: {
    label: string;
    value: number;
    onDecrease: () => void;
    onIncrease: () => void;
    min?: number;
    max?: number;
  }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <label className="text-sm font-medium text-gray-700 w-32">
        {label}
      </label>
      
      <div className="flex items-center gap-3">
        {/* Decrease Button */}
        <Button
          variant="default"
          onClick={onDecrease}
          disabled={disabled || value <= min}
          className="w-8 h-8 p-0 text-lg flex items-center justify-center font-bold"
          aria-label={`Decrease ${label}`}
        >
          −
        </Button>
        
        {/* Value Display */}
        <div className="w-16 text-center">
          <span className="text-lg font-semibold text-gray-800">
            {value}
          </span>
          <span className="text-sm text-gray-500 ml-1">min</span>
        </div>
        
        {/* Increase Button */}
        <Button
          variant="default"
          onClick={onIncrease}
          disabled={disabled || value >= max}
          className="w-8 h-8 p-0 text-lg flex items-center justify-center font-bold"
          aria-label={`Increase ${label}`}
        >
          +
        </Button>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
        Timer Settings
      </h3>
      
      <div className="space-y-3">
        {/* Work Session Length */}
        <SettingRow
          label="Work Session"
          value={workLength}
          onDecrease={() => onWorkLengthChange(Math.max(1, workLength - 1))}
          onIncrease={() => onWorkLengthChange(Math.min(60, workLength + 1))}
          min={1}
          max={60}
        />
        
        {/* Short Break Length */}
        <SettingRow
          label="Short Break"
          value={shortBreakLength}
          onDecrease={() => onShortBreakLengthChange(Math.max(1, shortBreakLength - 1))}
          onIncrease={() => onShortBreakLengthChange(Math.min(30, shortBreakLength + 1))}
          min={1}
          max={30}
        />
        
        {/* Long Break Length */}
        <SettingRow
          label="Long Break"
          value={longBreakLength}
          onDecrease={() => onLongBreakLengthChange(Math.max(5, longBreakLength - 1))}
          onIncrease={() => onLongBreakLengthChange(Math.min(60, longBreakLength + 1))}
          min={5}
          max={60}
        />
      </div>
      
      {disabled && (
        <p className="text-sm text-gray-500 text-center mt-4 italic">
          Settings are disabled while timer is running
        </p>
      )}
    </div>
  );
};

export default LengthSetting;
