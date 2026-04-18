import React from "react";

import { Settings } from "@/types";

export default function DataRetentionCard({ dataRetention, onChange }: { dataRetention: Settings['dataRetention']; onChange: (payload: Settings['dataRetention']) => void }) {
    return (
        <div className="bg-white/80 dark:bg-transparent p-6 border-2 border-bluelight-1/40 rounded-xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-bluelight-1 mb-4">Data Retention</h2>


            <div className="space-y-6">
                <div>
                    <label className="block text-sm text-bluelight-1/70">Keep data for (days)</label>
                    <input
                        type="number"
                        className="mt-2 w-40 px-3 py-2 border-2 border-bluelight-1/40 rounded-xl bg-white/80"
                        value={dataRetention.keepDataFor}
                        onChange={(e) => onChange({ ...dataRetention, keepDataFor: parseInt(e.target.value || '0') })}
                    />
                </div>


                <div className="flex items-center justify-between">
                    <div>
                        <div className="font-medium text-bluelight-1">Auto-delete old data</div>
                        <div className="text-xs text-bluelight-1/70">Automatically purge records older than retention period</div>
                    </div>


                    <button
                        onClick={() => onChange({ ...dataRetention, autoDelete: !dataRetention.autoDelete })}
                        className={`px-4 py-1 rounded-lg transition ${dataRetention.autoDelete ? 'bg-bluelight-2 text-white' : 'border-2 border-bluelight-1/40'}`}>
                        {dataRetention.autoDelete ? 'Enabled' : 'Disabled'}
                    </button>
                </div>
            </div>
        </div>
    );
}