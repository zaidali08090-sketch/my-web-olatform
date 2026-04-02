import { db } from '../config/firebase';
import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs, query, where, orderBy, limit, } from 'firebase/firestore';

export const addContent = async (collectionName, data) => {
    try {
        const docRef = await addDoc(collection(db, collectionName), { ...data, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), });
        return docRef.id;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getContent = async (collectionName, filters = []) => {
    try {
        let q = collection(db, collectionName);
        if (filters.length > 0) {
            q = query(collection(db, collectionName), ...filters);
        }
        const snapshot = await getDocs(q);
        const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return items;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateContent = async (collectionName, docId, data) => {
    try {
        await updateDoc(doc(db, collectionName, docId), { ...data, updatedAt: new Date().toISOString(), });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteContent = async (collectionName, docId) => {
    try {
        await deleteDoc(doc(db, collectionName, docId));
    } catch (error) {
        throw new Error(error.message);
    }
};

export const searchContent = async (collectionName, searchField, searchValue) => {
    try {
        const q = query(
            collection(db, collectionName),
            where(searchField, '>=', searchValue),
            where(searchField, '<=', searchValue + '\uf8ff')
        );
        const snapshot = await getDocs(q);
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getUserCount = async () => {
    try {
        const usersRef = collection(db, 'users');
        const snapshot = await getDocs(usersRef);
        return snapshot.size;
    } catch (error) {
        throw new Error(error.message);
    }
};