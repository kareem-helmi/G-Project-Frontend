import React from "react";

export default function SaveBar({ dirty, saving, onSave }: { dirty: boolean; saving: boolean; onSave: () => void }) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <div className="bg-white/90 dark:bg-[#071023]/90 border-2 border-bluelight-1/30 rounded-full px-5 py-3 shadow-lg flex items-center gap-4">
                <span className="text-sm text-bluelight-1/80">{dirty ? 'You have unsaved changes' : 'All changes saved'}</span>
                <button disabled={!dirty || saving} onClick={onSave} className={`px-5 py-2 rounded-lg transition ${dirty ? 'bg-bluelight-2 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {saving ? 'Saving...' : 'Save'}
                </button>
            </div>
        </div>
    );
}