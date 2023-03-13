import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export async function increaseCatClicks(id: string) {
    const catDocRef = doc(db, 'cats', id)
    await updateDoc(catDocRef, {
        clickTimes: increment(1)
    })

}