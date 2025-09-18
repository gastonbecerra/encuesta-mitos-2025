"use server";

import { db } from "@/lib/firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function submitSurvey(surveyData: any) {
  try {
    const docRef = await addDoc(collection(db, "survey-responses"), {
      ...surveyData,
      submittedAt: serverTimestamp(),
    });
    console.log("Document written with ID: ", docRef.id);
    return { success: true, docId: docRef.id };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { success: false, error: "Failed to submit survey." };
  }
}
