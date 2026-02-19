'use client';

import { Skeleton } from "@/components/ui/skeleton";

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { User, Phone, LogOut, Shield, Clock, CheckCircle, Edit2, Save, X, Loader, MapPin, CreditCard } from 'lucide-react';
import { isValidIndianNumber } from '@/utils/validation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfilePage() {
    const { user, loading: authLoading, logout, login } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        state: '',
        pincode: '',
        identityType: '',
        identityNumber: '',
    });

    // Phone change states (separate flow)
    const [editingPhone, setEditingPhone] = useState(false);
    const [newPhone, setNewPhone] = useState('');
    const [phoneOtp, setPhoneOtp] = useState('');
    const [phoneOtpSent, setPhoneOtpSent] = useState(false);
    const [savingPhone, setSavingPhone] = useState(false);
    const [phoneError, setPhoneError] = useState('');

    // Credit Report State
    const [creditScore, setCreditScore] = useState(null);

    const [fetchingProfile, setFetchingProfile] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (authLoading) return;
            if (!user) return; // Wait for user to be present from auth context

            try {
                const res = await api.get('/users/me');
                if (res.data.success && res.data.data.user) {
                    initializeFormData(res.data.data.user);
                }
                await fetchCreditScore();
            } catch (error) {
                console.error("Failed to fetch fresh profile data:", error);
                // Fallback to context user if fetch fails
                initializeFormData(user);
            } finally {
                setFetchingProfile(false);
            }
        };

        fetchProfileData();
    }, [authLoading, user?.id]);

    const fetchCreditScore = async () => {
        try {
            const res = await api.get('/credit-report/check-cache');
            if (res.data.cached) {
                setCreditScore(res.data.report.creditScore);
            }
        } catch (error) {
            console.error("Failed to fetch credit score for profile:", error);
        }
    };

    const initializeFormData = (userData) => {
        setFormData({
            firstName: userData.firstName || '',
            middleName: userData.middleName || '',
            lastName: userData.lastName || '',
            // Format date for input type="date" (YYYY-MM-DD)
            dateOfBirth: userData.dateOfBirth ? new Date(userData.dateOfBirth).toISOString().split('T')[0] : '',
            gender: userData.gender || '',
            address: userData.address || '',
            state: userData.state || '',
            pincode: userData.pincode || '',
            identityType: userData.identityType || '',
            identityNumber: userData.identityNumber || '',
        });
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            // Filter out masked identity number to avoid overwriting with asterisks
            const payload = { ...formData };
            if (payload.identityNumber && payload.identityNumber.includes('*')) {
                delete payload.identityNumber;
            }

            const response = await api.patch('/users/profile', payload);

            const data = response.data;

            if (data.success) {
                const updatedUser = data.data.user;
                login(updatedUser); // Update context
                setIsEditing(false);
                toast.success('Profile updated successfully');
            } else {
                toast.error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    // --- Phone Change Logic ---

    const handleSendPhoneOtp = async () => {
        if (!isValidIndianNumber(newPhone)) {
            setPhoneError('Please enter a valid mobile number');
            return;
        }
        setPhoneError('');
        setSavingPhone(true);
        try {
            const response = await api.post('/users/change-phone', { newPhoneNumber: newPhone });

            if (response.data.success) {
                setPhoneOtpSent(true);
            } else {
                setPhoneError(response.data.message || 'Failed to send OTP');
            }
        } catch (error) {
            console.error('Error sending OTP:', error);
            setPhoneError(error.response?.data?.message || 'Failed to send OTP');
        } finally {
            setSavingPhone(false);
        }
    };

    const handleVerifyPhoneOtp = async () => {
        if (phoneOtp.length !== 6) {
            setPhoneError('Please enter 6-digit OTP');
            return;
        }
        setPhoneError('');
        setSavingPhone(true);
        try {
            const response = await api.post('/users/verify-phone-change', { newPhoneNumber: newPhone, otp: phoneOtp });

            if (response.data.success) {
                const updatedUser = response.data.data.user;
                login(updatedUser); // Update context
                setEditingPhone(false);
                setPhoneOtpSent(false);
                setNewPhone('');
                setPhoneOtp('');
                toast.success('Phone number updated successfully!');
            } else {
                setPhoneError(response.data.message || 'Invalid OTP');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setPhoneError(error.response?.data?.message || 'Failed to verify OTP');
        } finally {
            setSavingPhone(false);
        }
    };

    const cancelEdit = () => {
        setIsEditing(false);
        if (user) initializeFormData(user);
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return 'Just now';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
        });
    };

    if (authLoading || fetchingProfile) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto space-y-8">
                    <Skeleton className="h-48 w-full rounded-3xl opacity-80" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <Skeleton className="h-80 w-full rounded-2xl" />
                            <Skeleton className="h-48 w-full rounded-2xl" />
                        </div>
                        <div className="space-y-6">
                            <Skeleton className="h-32 w-full rounded-2xl" />
                            <Skeleton className="h-20 w-full rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Header Card - Premium Design */}
                <div className="bg-gradient-to-br from-[#2D3E50] to-[#3A6EA5] rounded-3xl shadow-2xl p-8 md:p-10 text-white relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 md:w-36 md:h-36 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl border-4 border-white/30">
                            <span className="text-5xl md:text-6xl font-bold text-white">
                                {user?.firstName?.charAt(0) || user?.phoneNumber?.charAt(0) || 'U'}
                            </span>
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Complete your profile'}
                            </h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/80">
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Phone className="h-4 w-4" />
                                    {user?.phoneNumber}
                                </div>
                                <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                                    <Clock className="h-4 w-4" />
                                    Last login: {getTimeAgo(user?.lastLogin)}
                                </div>
                                {user?.isVerified && (
                                    <div className="flex items-center gap-2 bg-green-500/20 px-3 py-1.5 rounded-full text-green-200 font-medium">
                                        <CheckCircle className="h-4 w-4" />
                                        Verified
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex-shrink-0">
                            {!isEditing && (
                                <Button onClick={() => setIsEditing(true)} className="gap-2 bg-white text-[#2D3E50] hover:bg-white/90 font-semibold px-6 py-3 text-base shadow-lg">
                                    <Edit2 className="h-5 w-5" /> Edit Profile
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Main Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Left Column: Personal & Identity */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Personal Details */}
                        <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-blue-100 rounded-lg">
                                        <User className="h-5 w-5 text-blue-600" />
                                    </div>
                                    Personal Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Middle Name</Label>
                                    <Input
                                        value={formData.middleName}
                                        onChange={(e) => handleInputChange('middleName', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Middle Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Last Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Date of Birth</Label>
                                    <Input
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Gender</Label>
                                    <Select
                                        value={formData.gender}
                                        onValueChange={(val) => handleInputChange('gender', val)}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Gender" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Transgender">Transgender</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Contact Details */}
                        <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-green-100 rounded-lg">
                                        <MapPin className="h-5 w-5 text-green-600" />
                                    </div>
                                    Contact Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-5 p-6">
                                <div className="space-y-2">
                                    <Label>Address</Label>
                                    <Input
                                        value={formData.address}
                                        onChange={(e) => handleInputChange('address', e.target.value)}
                                        disabled={!isEditing}
                                        placeholder="Full Address"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>State</Label>
                                        <Input
                                            value={formData.state}
                                            onChange={(e) => handleInputChange('state', e.target.value)}
                                            disabled={!isEditing}
                                            placeholder="State"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Pincode</Label>
                                        <Input
                                            value={formData.pincode}
                                            onChange={(e) => handleInputChange('pincode', e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            disabled={!isEditing}
                                            placeholder="Pincode"
                                            maxLength={6}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Identity Proof */}
                        <Card className="shadow-lg border-0 bg-white rounded-2xl overflow-hidden">
                            <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b">
                                <CardTitle className="flex items-center gap-3 text-lg">
                                    <div className="p-2 bg-purple-100 rounded-lg">
                                        <CreditCard className="h-5 w-5 text-purple-600" />
                                    </div>
                                    Identity Proof
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6">
                                <div className="space-y-2">
                                    <Label>Identity Type</Label>
                                    <Select
                                        value={formData.identityType}
                                        onValueChange={(val) => handleInputChange('identityType', val)}
                                        disabled={!isEditing}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select ID Type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="PAN">PAN Card</SelectItem>
                                            <SelectItem value="Aadhaar">Aadhaar Card</SelectItem>
                                            <SelectItem value="VOTER_CARD">Voter Card</SelectItem>
                                            <SelectItem value="Passport">Passport</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Identity Number</Label>
                                    <Input
                                        value={formData.identityNumber}
                                        onChange={(e) => handleInputChange('identityNumber', e.target.value.toUpperCase())}
                                        disabled={!isEditing}
                                        placeholder="Enter ID Number"
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Save Actions */}
                        {isEditing && (
                            <div className="flex justify-end gap-3 sticky bottom-4 bg-white/90 p-4 rounded-xl backdrop-blur-sm border shadow-lg z-10">
                                <Button variant="outline" onClick={cancelEdit} disabled={isSaving}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    {isSaving ? (
                                        <>
                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="mr-2 h-4 w-4" />
                                            Save Changes
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Phone & Account */}
                    <div className="space-y-6">

                        {/* Phone Number (Separate Edit Flow) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="h-5 w-5 text-indigo-500" />
                                    Phone Number
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {!editingPhone ? (
                                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <span className="font-medium text-gray-700">{user?.phoneNumber}</span>
                                        <Button variant="ghost" size="sm" onClick={() => setEditingPhone(true)}>
                                            <Edit2 className="h-4 w-4 text-blue-600" />
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        {!phoneOtpSent ? (
                                            <div className="space-y-2">
                                                <Label>New Number</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={newPhone}
                                                        onChange={(e) => setNewPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                                        placeholder="10-digit number"
                                                    />
                                                    <Button onClick={handleSendPhoneOtp} disabled={savingPhone} size="sm">
                                                        {savingPhone ? <Loader className="h-4 w-4 animate-spin" /> : 'Send'}
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-2">
                                                <Label>Enter OTP</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={phoneOtp}
                                                        onChange={(e) => setPhoneOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                                        placeholder="XXXXXX"
                                                        className="text-center tracking-widest"
                                                    />
                                                    <Button onClick={handleVerifyPhoneOtp} disabled={savingPhone} size="sm" className="bg-green-600 hover:bg-green-700">
                                                        {savingPhone ? <Loader className="h-4 w-4 animate-spin" /> : 'Verify'}
                                                    </Button>
                                                </div>
                                                <p className="text-xs text-gray-500">Sent to {newPhone}</p>
                                            </div>
                                        )}
                                        {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full text-gray-500"
                                            onClick={() => {
                                                setEditingPhone(false);
                                                setPhoneOtpSent(false);
                                                setNewPhone('');
                                                setPhoneOtp('');
                                                setPhoneError('');
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <div className="grid grid-cols-1 gap-3">


                            <a href="/credit-check" className="block">
                                <Card className="hover:shadow-md transition-all cursor-pointer border-blue-100 bg-blue-50/50">
                                    <CardContent className="p-4 flex items-center justify-between gap-3">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                                <Shield className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">Credit Score</p>
                                                <p className="text-xs text-gray-500">
                                                    {creditScore ? `Current Score: ${creditScore}` : 'Check your score'}
                                                </p>
                                            </div>
                                        </div>
                                        {creditScore && (
                                            <div className={`text-lg font-bold ${creditScore >= 750 ? 'text-green-600' : creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'}`}>
                                                {creditScore}
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            </a>
                            <Button variant="destructive" className="w-full gap-2" onClick={handleLogout}>
                                <LogOut className="h-4 w-4" /> Logout
                            </Button>
                        </div>

                    </div>
                </div>
            </div >
        </div >
    );
}
