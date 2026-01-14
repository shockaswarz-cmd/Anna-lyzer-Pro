import { db } from '@/lib/firebase';
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    Timestamp,
    limit
} from 'firebase/firestore';

export interface FeedbackItem {
    id?: string;
    type: 'bug' | 'feature' | 'general';
    message: string;
    email?: string;
    page: string;
    userAgent: string;
    createdAt: Timestamp | string;
}

/**
 * Submit user feedback to Firestore.
 */
export async function submitFeedback(feedback: Omit<FeedbackItem, 'id' | 'createdAt'>): Promise<string | null> {
    if (!db) return null;

    try {
        const docRef = await addDoc(collection(db, 'feedback'), {
            ...feedback,
            createdAt: Timestamp.now()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        return null;
    }
}

/**
 * Get all feedback (admin only).
 */
export async function listFeedback(maxItems: number = 50): Promise<FeedbackItem[]> {
    if (!db) return [];

    try {
        const q = query(
            collection(db, 'feedback'),
            orderBy('createdAt', 'desc'),
            limit(maxItems)
        );

        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                id: doc.id,
                createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt
            } as FeedbackItem;
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return [];
    }
}
