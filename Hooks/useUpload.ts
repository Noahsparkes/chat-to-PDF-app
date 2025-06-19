// // experimental Hook for uploading files to Firebase Storage and saving metadata to Firestore
// 'use client'
// import { useState } from 'react';
// import { useUser } from '@supabase/auth-helpers-react';
// import { v4 as uuidv4 } from 'uuid';
// import { db, storage } from '@/firebase';
// import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
// import { setDoc, doc } from 'firebase/firestore'; 

// export enum statusText {
//     UPLOADING = "uploading file...",
//     UPLOADED = "file  uploaded successfully",
//     SAVING = "saving file to database...",
//     GENERATING = "Generating AI Embededings, this will take a few seconds...",
// }

// // Use the enum directly for type
// export type status = statusText | null;

// function useUpload() {
//     const [progress, setProgress] = useState<number | null>(null);
//     const [fileId, setFileId] = useState<string | null>(null);
//     const [status, setStatus] = useState<status>(null);
//     const user = useUser();
//     // const router = useRouter(); // Removed unused variable

//     const handleUpload = async (file: File) => {
//         console.log("handleUpload called with file:", file);
//         console.log( "current User:",user);
//         if (!file || !user) return;

//         // free or pro limit
//         const fileIdToUploadTo = uuidv4();

//         const storageRef = ref(
//             storage,
//             `users/${user.id}/files/${fileIdToUploadTo}`
//         );

//         const uploadTask = uploadBytesResumable(storageRef, file);

//         uploadTask.on(
//             'state_changed',
//             (snapshot) => {
//                 const percent = Math.round(
//                     (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//                 );
//                 setStatus(statusText.UPLOADING);
//                 setProgress(percent);
//             },
//             (error) => {
//                 console.error("Upload failed:", error);
//             },
//             async () => {
//                 setStatus(statusText.UPLOADED);

//                 const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

//                 setStatus(statusText.SAVING);
//                 await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
//                     name: file.name,
//                     size: file.size,
//                     type: file.type,
//                     downloadURL: downloadURL,
//                     ref: uploadTask.snapshot.ref.fullPath,
//                     createdAt: new Date(),
//                 });

//                 setStatus(statusText.GENERATING); //generate AI embeddings here

//                 setFileId(fileIdToUploadTo);
//             }
//         );
//     };

//     return { handleUpload, progress, status, fileId };
// }

// export default useUpload;

'use client';
import { useUser } from '@supabase/auth-helpers-react';

export function debugUpload(file: File) {
  console.log('🔥 debugUpload called with:', { file });
}

export function useUpload() {
  const user = useUser();
  console.log('👤 useUpload sees user:', user);
  
  const handleUpload = async (file: File) => {
    console.log('🚀 handleUpload called with:', { file, user });
  };
  
  return { handleUpload, progress: null, status: null, fileId: null };
}
