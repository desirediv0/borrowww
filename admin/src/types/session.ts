export interface UserSession {
    id: string;
    sessionId: string;
    userId: string;
    user?: {
        id: string;
        name?: string;
        email?: string;
        phone?: string;
    };
    startTime: string;
    endTime?: string;
    lastActivity: string;
    firstName?: string | null;
    lastName?: string | null;
    phoneNumber?: string | null;
    isActive: boolean;
    currentPage?: string;
    totalPageViews: number;
    pagesVisited?: {
        page: string;
        url?: string;
        enteredAt?: string;
        leftAt?: string | null;
    }[];
    ipAddress?: string;
    userAgent?: string;
    deviceInfo?: any;
    userType?: 'user' | 'non-user' | 'user-deleted';
}
