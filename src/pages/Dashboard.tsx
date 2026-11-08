import { useEffect, useState } from 'react';
import { supabase, Signal } from '../lib/supabase';
import SignalCard from '../components/SignalCard';

export default function Dashboard() {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    // Initial fetch
    supabase.from('signals')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => data && setSignals(data as Signal[]));

    // Realtime subscription
    const channel = supabase.channel('signals-live')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'signals' },
        (payload) => {
          const s = payload.new as Signal;
          setSignals(prev => [s, ...prev].slice(0, 50));
          if (Notification.permission === 'granted') {
            new Notification(`🔥 ${s.action} ${s.asset}`, {
              body: `${s.confidence}% @ ${s.price}`,
            });
          }
        })
      .subscribe(status => setLive(status === 'SUBSCRIBED'));

    if (Notification.permission === 'default') Notification.requestPermission();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const logout = () => supabase.auth.signOut();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-black">🔥 Shadow Signals</h1>
          <p className="text-sm text-gray-400">90%+ confluence · Forex 5m · manual execution</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm px-3 py-1 rounded ${live ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {live ? '● Live' : '○ Connecting'}
          </span>
          <button onClick={logout} className="text-sm text-gray-400 hover:text-white">Log out</button>
        </div>
      </header>

      {signals.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No signals yet. Scanner runs every 60s. Waiting for 90%+ confluence…
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {signals.map(s => <SignalCard key={s.id} s={s} />)}
        </div>
      )}

      <p className="mt-8 text-xs text-gray-600 max-w-2xl">
        ⚠️ 90% confidence = 90% indicator confluence, not 90% win rate. Execute manually in Quotex.
      </p>
    </div>
  );
                                   }
