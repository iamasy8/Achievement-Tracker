import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const features = [
    {
        title: "Todo List",
        description: "Keep track of your tasks and mark them as complete",
        icon: "✓",
        link: "/todos"
    },
    {
        title: "Event Tracker",
        description: "Never miss important meetings or deadlines",
        icon: "📅",
        link: "/events"
    },
    {
        title: "Pomodoro Timer",
        description: "Stay focused with timed work sessions",
        icon: "⏱️",
        link: "/pomodoro"
    },
    {
        title: "Progress Dashboard",
        description: "Visualize your achievements and productivity",
        icon: "📊",
        link: "/progress"
    }
    ];

    return (
    <div className="text-center">
        <h1 className="text-4xl font-bold mt-8 mb-4">Welcome to Achievement Tracker</h1>
        <p className="text-xl mb-8">Your personal productivity assistant to help you achieve more</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link to={feature.link} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Get Started
            </Link>
            </div>
        ))}
        </div>
        
        <div className="mt-16 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Track Your Achievements</h2>
        <p className="text-gray-700">
            This app helps you organize tasks, manage your time with the Pomodoro technique, 
            and keep track of important events - all in one place. Start boosting your productivity today!
        </p>
        </div>
        
        <footer className="mt-12 py-4 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2">
            <span>Developed by ASY</span>
            <span className="text-gray-400">|</span>
            <a href="https://github.com/iamasy8" target="_blank" rel="noopener noreferrer"className="flex items-center text-gray-700 hover:text-blue-600">
            <span className="mr-1">🔗</span>iamasy8
            </a>
        </div>
        </footer>
    </div>
    );
};

export default HomePage;