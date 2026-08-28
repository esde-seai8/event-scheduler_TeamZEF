import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/api';
import EventCard from '../components/EventCard';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetching events using query limit=100 to show seeded events
    fetchAPI('/events?limit=100')
      .then((data) => {
        // According to OpenAPI: GET /api/events returns { totalCount, results: [...] }
        const eventList = Array.isArray(data) ? data : (data.results || []);
        
        // Sort chronologically by date
        const sorted = [...eventList].sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sorted);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-12 text-slate-500">Loading events...</p>;
  if (error) return <p className="text-center mt-12 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="text-3xl font-extrabold mb-6">Upcoming Events</h1>
      {events.length === 0 ? (
        <p className="text-slate-500">No events scheduled at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}