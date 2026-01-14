import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export interface UserProfile {
    uid: string;
    profile: {
        name: string;
        email: string;
        phone: string;
    };
    branding: {
        companyName: string;
        logoUrl: string;
        primaryColor: string;
    };
    preferences: {
        defaultStrategy: string;
        defaultLTV: number;
        defaultInterestRate: number;
        darkMode: boolean;
        emailNotifications: boolean;
        pushNotifications: boolean;
    };
}

export const defaultProfile = {
    profile: {
        name: '',
        email: '',
        phone: ''
    },
    branding: {
        companyName: 'My Property Company',
        logoUrl: '',
        primaryColor: '#10b981'
    },
    preferences: {
        defaultStrategy: 'BTL',
        defaultLTV: 75,
        defaultInterestRate: 5.5,
        darkMode: true,
        emailNotifications: true,
        pushNotifications: false
    }
};

/**
 * Fetch a user's profile from Firestore.
 * Creates a default profile if one doesn't exist.
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
    if (!uid || !db) return null;

    try {
        const userRef = doc(db, 'users', uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            return { uid, ...userSnap.data() } as UserProfile;
        } else {
            // Create default profile for new user
            const newProfile = { uid, ...defaultProfile };
            await setDoc(userRef, newProfile);
            return newProfile;
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        return null;
    }
}

/**
 * Update a user's profile in Firestore.
 */
export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<boolean> {
    if (!uid || !db) return false;

    try {
        const userRef = doc(db, 'users', uid);
        await updateDoc(userRef, data);
        return true;
    } catch (error) {
        console.error('Error updating user profile:', error);
        return false;
    }
}
