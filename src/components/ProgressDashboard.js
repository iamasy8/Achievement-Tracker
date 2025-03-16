// components/ProgressDashboard.js
import React, { useState, useEffect } from 'react';

const ProgressDashboard = () => {
  const [todos, setTodos] = useState([]);
  const [events, setEvents] = useState([]);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [streakData, setStreakData] = useState(() => {
    const saved = localStorage.getItem('streakData');
    return saved ? JSON.parse(saved) : {
      currentStreak: 0,
      lastActive: null
    };
  });

  useEffect(() => {
    // Load data from localStorage
    const savedTodos = localStorage.getItem('todos');
    const savedEvents = localStorage.getItem('events');
    const savedPomodoros = localStorage.getItem('pomodorosCompleted');
    
    if (savedTodos) setTodos(JSON.parse(savedTodos));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedPomodoros) setPomodorosCompleted(parseInt(savedPomodoros));
    
    // Update streak
    updateStreak();
  }, []);

  const updateStreak = () => {
    const today = new Date().toLocaleDateString();
    
    if (streakData.lastActive) {
      const lastDate = new Date(streakData.lastActive);
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (streakData.lastActive === today) {
        // Already marked for today
        return;
      } else if (lastDate.toLocaleDateString() === yesterday.toLocaleDateString()) {
        // Consecutive day
        const newStreakData = {
          currentStreak: streakData.currentStreak + 1,
          lastActive: today
        };
        setStreakData(newStreakData);
        localStorage.setItem('streakData', JSON.stringify(newStreakData));
      } else if (lastDate < yesterday) {
        // Streak broken
        const newStreakData = {
          currentStreak: 1,
          lastActive: today
        };
        setStreakData(newStreakData);
        localStorage.setItem('streakData', JSON.stringify(newStreakData));
      }
    } else {
      // First time using the app
      const newStreakData = {
        currentStreak: 1,
        lastActive: today
      };
      setStreakData(newStreakData);
      localStorage.setItem('streakData', JSON.stringify(newStreakData));
    }
  };

  // Calculate completed todos percentage
  const completedTodosPercentage = todos.length > 0 
    ? Math.round((todos.filter(todo => todo.completed).length / todos.length) * 100) 
    : 0;

  // Get upcoming events (next 7 days)
  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 7);
  
  const upcomingEvents = events
    .filter(event => {
      const eventDate = new Date(event.timestamp);
      return eventDate >= now && eventDate <= nextWeek;
    })
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Progress Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Streak Card */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Current Streak</h3>
          <div className="flex items-center">
            <div className="text-4xl font-bold text-orange-500 mr-2">{streakData.currentStreak}</div>
            <div className="text-gray-600">days</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Last active: {streakData.lastActive || 'Today'}
          </p>
        </div>
        
        {/* Todo Progress */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Todo Progress</h3>
          <div className="flex items-center mb-2">
            <div className="text-4xl font-bold text-green-500 mr-2">
              {completedTodosPercentage}%
            </div>
            <div className="text-gray-600">completed</div>
          </div>
          <div className="bg-gray-200 h-3 rounded-full">
            <div 
              className="bg-green-500 h-3 rounded-full" 
              style={{ width: `${completedTodosPercentage}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            {todos.filter(todo => todo.completed).length} of {todos.length} tasks complete
          </p>
        </div>
        
        {/* Pomodoro Sessions */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-3">Pomodoro Sessions</h3>
          <div className="flex items-center">
            <div className="text-4xl font-bold text-red-500 mr-2">{pomodorosCompleted}</div>
            <div className="text-gray-600">completed</div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            That's about {(pomodorosCompleted * 25 / 60).toFixed(1)} hours of focused work!
          </p>
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-semibold mb-3">Upcoming Events</h3>
        {upcomingEvents.length > 0 ? (
          <ul>
            {upcomingEvents.map(event => (
              <li key={event.id} className="border-b last:border-b-0 py-3">
                <div className="flex justify-between">
                  <div>
                    <h4 className="font-medium">{event.title}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(event.timestamp).toLocaleDateString()} 
                      {event.time && ` at ${new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.ceil((new Date(event.timestamp) - now) / (1000 * 60 * 60 * 24))} days
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No upcoming events in the next 7 days.</p>
        )}
        <div className="mt-4 text-center">
          <a href="/events" className="text-blue-500 hover:underline">
            View all events
          </a>
        </div>
      </div>
      
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-md text-white text-center">
        <p className="text-xl italic mb-2">
          "Progress is not in enhancing what is, but in advancing toward what will be."
        </p>
        <p className="font-medium">- Kahlil Gibran</p>
      </div>
    </div>
  );
};

export default ProgressDashboard;