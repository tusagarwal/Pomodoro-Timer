/*
 * Main Pomodoro Timer Component
 * 
 * This is the main component that orchestrates the entire Pomodoro timer functionality.
 * It combines all the sub-components and manages the overall state.
 * 
 * Features:
 * - Complete Pomodoro workflow (work → short break → work → short break → work → long break)
 * - Timer state management
 * - Audio notifications
 * - Session tracking
 * - Responsive design
 */

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import TimerDisplay from './TimerDisplay';
import Controls from './Controls';
import LengthSetting from './LengthSetting';
import Alert from './Alert';
import ThemeSelector from './ThemeSelector';
import { useTheme } from './ThemeProvider';

type TimerMode = 'work' | 'break' | 'longBreak';

interface PomodoroState {
  mode: TimerMode;
  timeLeft: number; // seconds remaining in current segment
  isRunning: boolean;
  sessionsCompleted: number;
  workLength: number; // minutes
  shortBreakLength: number; // minutes
  longBreakLength: number; // minutes
}

const PomodoroTimer: React.FC = () => {
  const { currentTheme } = useTheme();
  
  const [state, setState] = useState<PomodoroState>({
    mode: 'work',
    timeLeft: 25 * 60, // 25 minutes in seconds
    isRunning: false,
    sessionsCompleted: 0,
    workLength: 25,
    shortBreakLength: 5,
    longBreakLength: 15,
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  // Track running state with ref to avoid closure issues
  const isRunningRef = useRef(false);

  // Convert seconds to minutes and seconds
  const getDisplayTime = () => {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    return { minutes, seconds };
  };

  // Show notification alert
  const showNotification = (message: string) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  // Auto-dismiss alert after 5 seconds
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  // Maintain a ref for the absolute timestamp (ms) when current period ends
  const targetEndRef = useRef<number | null>(null);

  // Drift-proof timer effect: compute remaining time from target each tick
  useEffect(() => {
    // Update ref when state changes
    isRunningRef.current = state.isRunning;
    
    if (!state.isRunning) {
      // Ensure target is cleared when not running
      targetEndRef.current = null;
      return;
    }
    
    // On starting, if we have no target yet, create one
    if (!targetEndRef.current) {
      targetEndRef.current = Date.now() + state.timeLeft * 1000;
    }

    const tick = () => {
      // Use ref to check current running state (not closure)
      if (!targetEndRef.current || !isRunningRef.current) return;
      
      const diffMs = targetEndRef.current - Date.now();
      const newSeconds = Math.max(0, Math.round(diffMs / 1000));
      
      // Only update state if we're still supposed to be running
      setState(prev => {
        if (!prev.isRunning || !isRunningRef.current) return prev; // Bail out if state changed
        return { ...prev, timeLeft: newSeconds };
      });
      
      if (newSeconds === 0 && isRunningRef.current) {
        // Auto switch mode once and stop running - inline the logic to avoid dependency issues
        setState(prev => {
          let newMode: TimerMode;
          let newTimeLeft: number;
          let newSessionsCompleted = prev.sessionsCompleted;

          if (prev.mode === 'work') {
            newSessionsCompleted += 1;
            if (newSessionsCompleted % 4 === 0) {
              newMode = 'longBreak';
              newTimeLeft = prev.longBreakLength * 60;
              showNotification('Great work! Time for a long break. 🎉');
            } else {
              newMode = 'break';
              newTimeLeft = prev.shortBreakLength * 60;
              showNotification('Work session complete! Time for a short break. ☕');
            }
          } else {
            newMode = 'work';
            newTimeLeft = prev.workLength * 60;
            showNotification('Break time is over! Ready to focus? 🚀');
          }

          // Reset target end so we recalc only when user starts again
          targetEndRef.current = null;
          isRunningRef.current = false;

          return {
            ...prev,
            mode: newMode,
            timeLeft: newTimeLeft,
            sessionsCompleted: newSessionsCompleted,
            isRunning: false,
          };
        });
      }
    };

    // Use shorter interval for smoother recovery after throttling
    const interval = setInterval(tick, 1000);
    // Initial immediate tick to sync in case of resume after visibility change
    tick();
    return () => clearInterval(interval);
  }, [state.isRunning]); // Only depend on isRunning state

  // Recalculate remaining time when tab becomes visible again (handles background throttling)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && state.isRunning && targetEndRef.current) {
        const diffMs = targetEndRef.current - Date.now();
        const newSeconds = Math.max(0, Math.round(diffMs / 1000));
        setState(prev => ({ ...prev, timeLeft: newSeconds }));
        if (newSeconds === 0) {
          // Inline switchMode logic here too
          setState(prev => {
            let newMode: TimerMode;
            let newTimeLeft: number;
            let newSessionsCompleted = prev.sessionsCompleted;

            if (prev.mode === 'work') {
              newSessionsCompleted += 1;
              if (newSessionsCompleted % 4 === 0) {
                newMode = 'longBreak';
                newTimeLeft = prev.longBreakLength * 60;
                showNotification('Great work! Time for a long break. 🎉');
              } else {
                newMode = 'break';
                newTimeLeft = prev.shortBreakLength * 60;
                showNotification('Work session complete! Time for a short break. ☕');
              }
            } else {
              newMode = 'work';
              newTimeLeft = prev.workLength * 60;
              showNotification('Break time is over! Ready to focus? 🚀');
            }

            targetEndRef.current = null;
            isRunningRef.current = false;

            return {
              ...prev,
              mode: newMode,
              timeLeft: newTimeLeft,
              sessionsCompleted: newSessionsCompleted,
              isRunning: false,
            };
          });
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [state.isRunning]);

  // Control handlers
  const handleStartPause = () => {
    setState(prev => {
      const newRunningState = !prev.isRunning;
      isRunningRef.current = newRunningState; // Update ref immediately
      return { ...prev, isRunning: newRunningState };
    });
  };

  const handleReset = () => {
    targetEndRef.current = null; // Clear target so next start recalculates
    isRunningRef.current = false; // Update ref immediately
    setState(prev => ({
      ...prev,
      isRunning: false,
      timeLeft: prev.mode === 'work'
        ? prev.workLength * 60
        : prev.mode === 'break'
          ? prev.shortBreakLength * 60
          : prev.longBreakLength * 60,
    }));
  };

  const handleSkip = () => {
    // First, immediately clear the target and stop the timer
    targetEndRef.current = null;
    isRunningRef.current = false; // Immediately update ref to stop timer
    
    // Then update state to switch modes
    setState(prev => {
      let newMode: TimerMode;
      let newTimeLeft: number;
      let newSessionsCompleted = prev.sessionsCompleted;

      if (prev.mode === 'work') {
        newSessionsCompleted += 1;
        if (newSessionsCompleted % 4 === 0) {
          newMode = 'longBreak';
          newTimeLeft = prev.longBreakLength * 60;
          showNotification('Great work! Time for a long break. 🎉');
        } else {
          newMode = 'break';
          newTimeLeft = prev.shortBreakLength * 60;
          showNotification('Work session complete! Time for a short break. ☕');
        }
      } else {
        newMode = 'work';
        newTimeLeft = prev.workLength * 60;
        showNotification('Break time is over! Ready to focus? 🚀');
      }

      return {
        ...prev,
        mode: newMode,
        timeLeft: newTimeLeft,
        sessionsCompleted: newSessionsCompleted,
        isRunning: false, // Always stop when skipping
      };
    });
  };

  const handleClearAll = () => {
    targetEndRef.current = null;
    isRunningRef.current = false; // Update ref immediately
    setShowAlert(false); // Clear any existing alerts
    setState({
      mode: 'work',
      timeLeft: 25 * 60, // Reset to default 25 minutes
      isRunning: false,
      sessionsCompleted: 0,
      workLength: 25,
      shortBreakLength: 5,
      longBreakLength: 15,
    });
  };

  // Settings handlers
  const handleWorkLengthChange = (length: number) => {
    setState(prev => ({
      ...prev,
      workLength: length,
      timeLeft: prev.mode === 'work' && !prev.isRunning ? length * 60 : prev.timeLeft,
    }));
    if (state.mode === 'work' && state.isRunning) {
      // Adjust target proportionally to remaining fraction if changing mid-run (optional simplistic approach: keep same remaining seconds)
      // For simplicity we just clear target so next tick rebuilds end time from updated remaining seconds
      targetEndRef.current = Date.now() + state.timeLeft * 1000;
    }
  };

  const handleShortBreakLengthChange = (length: number) => {
    setState(prev => ({
      ...prev,
      shortBreakLength: length,
      timeLeft: prev.mode === 'break' && !prev.isRunning ? length * 60 : prev.timeLeft,
    }));
    if (state.mode === 'break' && state.isRunning) {
      targetEndRef.current = Date.now() + state.timeLeft * 1000;
    }
  };

  const handleLongBreakLengthChange = (length: number) => {
    setState(prev => ({
      ...prev,
      longBreakLength: length,
      timeLeft: prev.mode === 'longBreak' && !prev.isRunning ? length * 60 : prev.timeLeft,
    }));
    if (state.mode === 'longBreak' && state.isRunning) {
      targetEndRef.current = Date.now() + state.timeLeft * 1000;
    }
  };

  const { minutes, seconds } = getDisplayTime();

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.background} py-8`}>
      {/* Alert */}
      {showAlert && (
        <Alert
          message={alertMessage}
          onClose={() => setShowAlert(false)}
        />
      )}

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🍅 Pomodoro Timer
          </h1>
          <p className="text-gray-600">
            Sessions completed: <span className="font-semibold">{state.sessionsCompleted}</span>
          </p>
        </div>

        {/* Theme Selector */}
        <div className="mb-8 max-w-2xl mx-auto">
          <ThemeSelector />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Settings Panel */}
          <div className="lg:order-1">
            <LengthSetting
              workLength={state.workLength}
              shortBreakLength={state.shortBreakLength}
              longBreakLength={state.longBreakLength}
              onWorkLengthChange={handleWorkLengthChange}
              onShortBreakLengthChange={handleShortBreakLengthChange}
              onLongBreakLengthChange={handleLongBreakLengthChange}
              disabled={state.isRunning}
            />
          </div>

          {/* Main Timer */}
          <div className="lg:order-2 flex flex-col items-center">
            <TimerDisplay
              minutes={minutes}
              seconds={seconds}
              isRunning={state.isRunning}
              mode={state.mode}
            />
            
            <Controls
              isRunning={state.isRunning}
              onStartPause={handleStartPause}
              onReset={handleReset}
              onSkip={handleSkip}
              onClearAll={handleClearAll}
            />
          </div>

          {/* Statistics or Future Features */}
          <div className="lg:order-3">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Today's Progress
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions:</span>
                  <span className="font-semibold">{state.sessionsCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Focus Time:</span>
                  <span className="font-semibold">
                    {Math.floor((state.sessionsCompleted * state.workLength) / 60)}h{' '}
                    {(state.sessionsCompleted * state.workLength) % 60}m
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Mode:</span>
                  <span className={`font-semibold capitalize ${
                    state.mode === 'work' ? 'text-red-600' : 
                    state.mode === 'break' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {state.mode === 'work' ? 'Focus' : 
                     state.mode === 'break' ? 'Short Break' : 'Long Break'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
