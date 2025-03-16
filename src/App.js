import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import TodoList from './components/TodoList';
import EventTracker from './components/EventTracker';
import PomodoroTimer from './components/PomodoroTimer';
import ProgressDashboard from './components/ProgressDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/todos" element={<TodoList />} />
            <Route path="/events" element={<EventTracker />} />
            <Route path="/pomodoro" element={<PomodoroTimer />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;