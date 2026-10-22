'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';

// Every panel is rendered into the HTML so search engines see all four lists;
// inactive panels are only hidden.
export default function ProfileTabs({ profiles }) {
    const [activeTab, setActiveTab] = useState(profiles[0].key);

    return (
        <>
            <div role="tablist" aria-label="Applicant profile" className="flex flex-wrap justify-center gap-2 mb-10">
                {profiles.map((profile) => (
                    <button
                        key={profile.key}
                        id={`tab-${profile.key}`}
                        type="button"
                        role="tab"
                        aria-selected={activeTab === profile.key}
                        aria-controls={`panel-${profile.key}`}
                        onClick={() => setActiveTab(profile.key)}
                        className={`px-6 py-3 rounded-full font-semibold transition-all ${activeTab === profile.key
                                ? 'bg-[#2D3E50] text-white shadow-md'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {profile.label}
                    </button>
                ))}
            </div>

            <div className="max-w-5xl mx-auto">
                {profiles.map((profile) => (
                    <div
                        key={profile.key}
                        id={`panel-${profile.key}`}
                        role="tabpanel"
                        aria-labelledby={`tab-${profile.key}`}
                        hidden={activeTab !== profile.key}
                        className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-100 shadow-lg"
                    >
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-gray-900">Documents for {profile.heading}</h3>
                            <p className="mt-2 text-gray-600">{profile.intro}</p>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-4">
                            {profile.docs.map((doc) => (
                                <li key={doc.name} className="flex gap-3 items-start bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                    <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                        <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                                    </span>
                                    <span>
                                        <span className="block font-semibold text-gray-900 text-base">{doc.name}</span>
                                        <span className="block text-sm text-gray-500 mt-0.5">{doc.purpose}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <p className="mt-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                            {profile.tip}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}
