// Deals Service - Firestore CRUD operations for deals

import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Deal } from '@/lib/types/deal';

// Helper to convert Firestore timestamps
function convertTimestamps(data: any): any {
    if (data instanceof Timestamp) {
        return data.toDate().toISOString();
    }
    if (Array.isArray(data)) {
        return data.map(convertTimestamps);
    }
    if (data && typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data).map(([key, value]) => [key, convertTimestamps(value)])
        );
    }
    return data;
}

// Check if Firebase is configured before any operation
function ensureDb() {
    if (!isFirebaseConfigured || !db) {
        throw new Error('Firebase is not configured. Please add your Firebase credentials to .env.local');
    }
    return db;
}

// Save or update a deal
export async function saveDeal(userId: string, deal: Deal): Promise<string> {
    const firestore = ensureDb();
    const dealRef = doc(firestore, 'users', userId, 'deals', deal.id);

    await setDoc(dealRef, {
        ...deal,
        updatedAt: serverTimestamp(),
        createdAt: deal.createdAt || serverTimestamp()
    });

    return deal.id;
}

// Get all deals for a user
export async function getDeals(userId: string): Promise<Deal[]> {
    const firestore = ensureDb();
    const dealsRef = collection(firestore, 'users', userId, 'deals');
    const q = query(dealsRef, orderBy('updatedAt', 'desc'));

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => convertTimestamps({ id: doc.id, ...doc.data() }) as Deal);
}

// Get a single deal
export async function getDeal(userId: string, dealId: string): Promise<Deal | null> {
    const firestore = ensureDb();
    const dealRef = doc(firestore, 'users', userId, 'deals', dealId);
    const snapshot = await getDoc(dealRef);

    if (!snapshot.exists()) return null;
    return convertTimestamps({ id: snapshot.id, ...snapshot.data() }) as Deal;
}

// Delete a deal
export async function deleteDeal(userId: string, dealId: string): Promise<void> {
    const firestore = ensureDb();
    const dealRef = doc(firestore, 'users', userId, 'deals', dealId);
    await deleteDoc(dealRef);
}

// Generate a new deal ID
export function generateDealId(): string {
    const firestore = ensureDb();
    return doc(collection(firestore, 'temp')).id;
}
