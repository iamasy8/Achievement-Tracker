import React, { useState, useEffect } from 'react';

export default function EventTracker(){
    const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
    });
    const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
    });

    useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
    };

    const addEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    
    const event = {
        id: Date.now(),
        ...newEvent,
        timestamp: new Date(`${newEvent.date}T${newEvent.time || '00:00'}`).getTime()
    };
    
    setEvents([...events, event]);
    setNewEvent({ title: '', date: '', time: '', description: '' });
    };

    const deleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
};

    const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);

    const eventsByDate = sortedEvents.reduce((acc, event) => {
    const date = new Date(event.timestamp).toLocaleDateString();
    if (!acc[date]) {
    acc[date] = [];
    }
    acc[date].push(event);
    return acc;
}, {});

    return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Upcoming Events</h2>
        
        <form onSubmit={addEvent} className="mb-8">
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Event Title:</label>
            <input
            type="text"
            name="title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            />
        </div>
        
        <div className="mb-4 flex space-x-4">
            <div className="flex-1">
            <label className="block text-gray-700 mb-2">Date:</label>
            <input
                type="date"
                name="date"
                value={newEvent.date}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            </div>

            <div className="flex-1">
            <label className="block text-gray-700 mb-2">Time:</label>
            <input
                type="time"
                name="time"
                value={newEvent.time}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>
        </div>
        
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description:</label>
            <textarea
            name="description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            ></textarea>
        </div>
        
        <button 
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
            Add Event
        </button>
        </form>
        
        <div>
        {Object.keys(eventsByDate).length === 0 ? (
            <p className="text-center text-gray-500">No upcoming events. Add one above!</p>
        ) : (
            Object.entries(eventsByDate).map(([date, eventsOnDate]) => (
            <div key={date} className="mb-6">
                <h3 className="font-semibold text-lg border-b pb-2 mb-2">{date}</h3>
                <ul>
                {eventsOnDate.map(event => (
                    <li key={event.id} className="border-b py-3">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-medium">{event.title}</h4>
                        <button 
                        onClick={() => deleteEvent(event.id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                        >
                        Delete
                        </button>
                    </div>
                    {event.time && (
                        <p className="text-sm text-gray-600">
                        {new Date(`${event.date}T${event.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    )}
                    {event.description && <p className="text-gray-700 mt-1">{event.description}</p>}
                    </li>
                ))}
                </ul>
            </div>
            ))
        )}
        </div>
    </div>
    );
};

