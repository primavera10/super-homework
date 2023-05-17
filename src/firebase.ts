import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, type DocumentData, type QueryDocumentSnapshot, type SnapshotOptions } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDM8f8ZaubFUqdl3TNCXy4V6pnRfHywgCE",
    authDomain: "super-homework.firebaseapp.com",
    projectId: "super-homework",
    storageBucket: "gs://super-homework.appspot.com",
    messagingSenderId: "936889458041",
    appId: "1:936889458041:web:e105d95751682e185be3a8",
    measurementId: "G-VBEEX8Z86W",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);

export interface CalendarEvent {
    date: Date,
    title: string,
    message: string,
    students: Array<string>,
    createdBy: {
        uid: string,
        email: string,
    },
    createdAt: Date,
    answers: Array <any>,
}

export const eventConverter = {
    toFirestore(event: CalendarEvent): DocumentData {
        return { ...event };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions,
    ): CalendarEvent {
        const data = snapshot.data(options)!;
        return {
            ...data,
            date: data.date.toDate(),
            createdAt: data.createdAt.toDate(),
        } as CalendarEvent;
    }
}
export const storage = getStorage(firebaseApp);

