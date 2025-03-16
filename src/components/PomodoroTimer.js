// components/PomodoroTimer.js
import React, { useState, useEffect } from 'react';

const PomodoroTimer = () => {
  const [mode, setMode] = useState('work'); // 'work', 'shortBreak', or 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(() => {
    const saved = localStorage.getItem('pomodorosCompleted');
    return saved ? parseInt(saved) : 0;
  });
  const [sessionsBeforeLongBreak, setSessionsBeforeLongBreak] = useState(4);
  const [currentSession, setCurrentSession] = useState(1);

  useEffect(() => {
    localStorage.setItem('pomodorosCompleted', pomodorosCompleted.toString());
  }, [pomodorosCompleted]);

  useEffect(() => {
    let interval = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Timer completed
      clearInterval(interval);
      
      // Play notification sound
      const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
      audio.play();
      
      // Handle session completion
      if (mode === 'work') {
        setPomodorosCompleted(count => count + 1);
        
        // Check if it's time for a long break
        if (currentSession % sessionsBeforeLongBreak === 0) {
          setMode('longBreak');
          setTimeLeft(30 * 60); // 30 minute long break
        } else {
          setMode('shortBreak');
          setTimeLeft(5 * 60); // 5 minute short break
        }
      } else {
        // After break, go back to work mode
        setMode('work');
        setTimeLeft(25 * 60);
        
        if (mode === 'longBreak') {
          setCurrentSession(1);
        } else {
          setCurrentSession(session => session + 1);
        }
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, currentSession, sessionsBeforeLongBreak]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'work') {
      setTimeLeft(25 * 60);
    } else if (mode === 'shortBreak') {
      setTimeLeft(5 * 60);
    } else {
      setTimeLeft(30 * 60);
    }
  };

  const skipToNextPhase = () => {
    setIsActive(false);
    
    if (mode === 'work') {
      // Skip to break
      if (currentSession % sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
        setTimeLeft(30 * 60);
      } else {
        setMode('shortBreak');
        setTimeLeft(5 * 60);
      }
      setPomodorosCompleted(count => count + 1);
    } else {
      // Skip to work
      setMode('work');
      setTimeLeft(25 * 60);
      
      if (mode === 'longBreak') {
        setCurrentSession(1);
      } else {
        setCurrentSession(session => session + 1);
      }
    }
  };

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Get background color based on mode
  const getBackgroundColor = () => {
    if (mode === 'work') return 'bg-red-100';
    if (mode === 'shortBreak') return 'bg-green-100';
    return 'bg-blue-100';
  };

  // Get text for current mode
  const getModeText = () => {
    if (mode === 'work') return 'Work Session';
    if (mode === 'shortBreak') return '5-Minute Break';
    return '30-Minute Break';
  };

  return (
    <div className={`max-w-md mx-auto rounded-lg shadow-md p-6 ${getBackgroundColor()}`}>
      <h2 className="text-2xl font-bold mb-6 text-center">Pomodoro Timer</h2>
      
      <div className="text-center mb-8">
        <div className="mb-2 text-gray-600">
          {getModeText()} {mode === 'work' && `(${currentSession}/${sessionsBeforeLongBreak})`}
        </div>
        <div className="text-6xl font-bold mb-4">{formatTime(timeLeft)}</div>
        
        <div className="flex justify-center space-x-4">
          <button 
            onClick={toggleTimer}
            className={`px-4 py-2 rounded ${isActive ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'} text-white`}
          >
            {isActive ? 'Pause' : 'Start'}
          </button>
          <button 
            onClick={resetTimer}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <button 
            onClick={skipToNextPhase}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Skip
          </button>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded shadow-inner">
        <h3 className="text-lg font-semibold mb-2">Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Pomodoros Completed</p>
            <p className="text-2xl font-bold">{pomodorosCompleted}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Current Session</p>
            <p className="text-2xl font-bold">{currentSession}/{sessionsBeforeLongBreak}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-gray-600 text-sm">
        <p>Work: 25 min | Short Break: 5 min | Long Break: 30 min</p>
        <p>Long break after {sessionsBeforeLongBreak} sessions</p>
      </div>
    </div>
  );
};

export default PomodoroTimer;