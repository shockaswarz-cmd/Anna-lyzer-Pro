import { db } from '@/lib/firebase';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp
} from 'firebase/firestore';
import { Deal } from '@/lib/types/deal';

// Define the Deal document structure for Firestore
// (This might be slightly different from the frontend Deal type if we need to index specific fields)
export interface FirestoreDeal extends Omit<Deal, 'id' | 'createdAt' | 'updatedAt'> {
    userId: string;
    createdAt: Timestamp;
    updatedAt: Timestamp;
    pipelineStatus: 'leads' | 'viewing' | 'offer' | 'purchased' | 'renting'; // Pipeline columns
    archived: boolean;
}

/**
 * Save a new deal to Firestore.
 */
export async function saveDeal(userId: string, deal: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>, status: FirestoreDeal['pipelineStatus'] = 'leads'): Promise<string | null> {
    if (!userId || !db) return null;

    try {
        const dealData: Omit<FirestoreDeal, 'id'> = {
            ...deal,
            userId,
            pipelineStatus: status,
            archived: false,
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now()
        };

        const docRef = await addDoc(collection(db, 'deals'), dealData);
        return docRef.id;
    } catch (error) {
        console.error('Error saving deal:', error);
        return null;
    }
}

/**
 * Update an existing deal.
 */
export async function updateDeal(dealId: string, data: Partial<FirestoreDeal>): Promise<boolean> {
    if (!dealId || !db) return false;

    try {
        const dealRef = doc(db, 'deals', dealId);
        await updateDoc(dealRef, {
            ...data,
            updatedAt: Timestamp.now()
        });
        return true;
    } catch (error) {
        console.error('Error updating deal:', error);
        return false;
    }
}

/**
 * Delete a deal.
 */
export async function deleteDeal(dealId: string): Promise<boolean> {
    if (!dealId || !db) return false;

    try {
        await deleteDoc(doc(db, 'deals', dealId));
        return true;
    } catch (error) {
        console.error('Error deleting deal:', error);
        return false;
    }
}

/**
 * Get all deals for a specific user.
 */
export async function getUserDeals(userId: string): Promise<Deal[]> {
    if (!userId || !db) return [];

    try {
        const q = query(
            collection(db, 'deals'),
            where('userId', '==', userId),
            orderBy('updatedAt', 'desc')
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data() as FirestoreDeal;
            return {
                ...data,
                id: doc.id,
                // Convert Firestore Timestamps to ISO strings for frontend
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString(),
                // Ensure legacy deals map correctly if schema changes
                pipelineStatus: data.pipelineStatus || 'leads'
            } as Deal & { pipelineStatus: string };
        });
    } catch (error) {
        console.error('Error fetching user deals:', error);
        return [];
    }
}

/**
 * Get a single deal by ID.
 */
export async function getDeal(dealId: string): Promise<Deal | null> {
    if (!dealId || !db) return null;

    try {
        const docRef = doc(db, 'deals', dealId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data() as FirestoreDeal;
            return {
                ...data,
                id: docSnap.id,
                createdAt: data.createdAt.toDate().toISOString(),
                updatedAt: data.updatedAt.toDate().toISOString()
            } as Deal;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting deal:', error);
        return null;
    }
}
