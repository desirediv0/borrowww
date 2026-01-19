// Shared types for admin services

export interface User {
    id: string;
    name: string;
    email: string;
    userType: string;
    phoneNumber?: string;
    isVerified?: boolean;
    firstName?: string;
    lastName?: string;
    lastLogin?: string;
    createdAt?: string;
    updatedAt?: string;
    // Add more fields as needed
}

export interface CibilData {
    id: string;
    userId: string;
    score: number;
    createdAt: string;
    // Add more fields as needed
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    [key: string]: any;
}
