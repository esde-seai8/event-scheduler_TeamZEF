import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  const formattedDate = event.date 
    ? new Date(event.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : 'Date TBA';

  return (
    <Link
      to={`/events/${event.id}`}
      className="group rounded-lg bg-linear-to-r from-cyan-400 via-blue-500 to-violet-500 p-px transition duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <div className="flex h-full flex-col justify-between rounded-[7px] bg-white p-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800">{event.title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            {event.location || 'Location TBA'}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-400">
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}