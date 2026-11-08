import { Signal } from '../lib/supabase';

export default function SignalCard({ s }: { s: Signal }) {
  const buy = s.action === 'BUY';
  const color = buy ? 'emerald' : 'red';
  return (
    <div className={`p-4 rounded-xl border border-${color}-500/40 bg-${color}-500/5`}>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">{s.asset}</span>
        <span className={`px-3 py-1 rounded font-black ${buy ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'}`}>
          {s.action}
        </span>
      </div>
      <div className="mt-2 text-sm text-gray-400">
        Price {s.price} · ATR {s.atr} · ADX {s.adx}
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs mb-1">
          <span>Confidence</span><span>{s.confidence}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded h-2">
          <div className="bg-emerald-500 h-2 rounded" style={{ width: `${s.confidence}%` }} />
        </div>
      </div>
      <ul className="mt-3 text-xs text-gray-300 space-y-1">
        {s.reasons.slice(0, 5).map((r, i) => <li key={i}>• {r}</li>)}
      </ul>
      <div className="mt-2 text-[10px] text-gray-500">{new Date(s.created_at).toLocaleString()}</div>
    </div>
  );
}
