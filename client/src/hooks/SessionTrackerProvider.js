
'use client';
import { useSessionTracker } from '../hooks/useSessionTracker';

export default function SessionTrackerProvider({ children }) {
    // Universal tracking for both user and non-user
    useSessionTracker();
    return children;
}
