import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    DocumentData
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '@/app/(dashboard)/doctor/foreign-bodies/identification/firebaseConfig';
import { Report } from '@/app/(dashboard)/doctor/foreign-bodies/reports/types/types';

export const fetchAllReports = async (): Promise<Report[]> => {
    try {
        const querySnapshot = await getDocs(collection(db, 'foreign'));
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        })) as Report[];
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw error;
    }
};

export const deleteReport = async (id: string): Promise<void> => {
    try {
        await deleteDoc(doc(db, 'foreign', id));
    } catch (error) {
        console.error('Error deleting document:', error);
        throw error;
    }
};

export const updateReport = async (id: string, data: Partial<Report>): Promise<void> => {
    try {
        const reportRef = doc(db, 'foreign', id);
        await updateDoc(reportRef, {
            ...data,
            updatedAt: new Date(),
        });
    } catch (error) {
        console.error('Error updating report:', error);
        throw error;
    }
};

export const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `xrays/${Date.now()}-${file.name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
};
