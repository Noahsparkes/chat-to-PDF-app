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

'use client'
import { useState } from 'react';
import { useUser } from '@supabase/auth-helpers-react';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytesResumable, uploadBytes } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore'; 

export enum statusText {
    UPLOADING = "uploading file...",
    UPLOADED = "file uploaded successfully",
    SAVING = "saving file to database...",
    GENERATING = "Generating AI Embeddings, this will take a few seconds...",
    FAILED = "Upload failed - check console",
    VERIFYING = "Verifying Firebase connection..."
}

export type UploadStatus = statusText | null;

function useUpload() {
    const [progress, setProgress] = useState<number | null>(null);
    const [fileId, setFileId] = useState<string | null>(null);
    const [status, setStatus] = useState<UploadStatus>(null);
    const user = useUser();

    const verifyFirebaseConnection = async () => {
        setStatus(statusText.VERIFYING);
        console.groupCollapsed("🔥 Firebase Connection Test");
        
        try {
            // Test Storage
            const testStorageRef = ref(storage, `connection-tests/${Date.now()}.txt`);
            await uploadBytes(testStorageRef, new Blob(["Connection test"]));
            console.log("✅ Storage connection working");

            // Test Firestore
            const testDocRef = doc(db, "_connection_tests", "test");
            await setDoc(testDocRef, { timestamp: new Date() });
            console.log("✅ Firestore connection working");

            console.groupEnd();
            return true;
        } catch (error) {
            console.error("❌ Firebase connection failed:", error);
            console.groupEnd();
            setStatus(statusText.FAILED);
            return false;
        }
    };

    const handleUpload = async (file: File) => {
        console.group("📁 File Upload Debug");
        console.log("Initializing upload...");

        if (!file || !user) {
            console.error("Missing file or user");
            console.groupEnd();
            return;
        }

        // 1. Verify Firebase connection first
        const isFirebaseConnected = await verifyFirebaseConnection();
        if (!isFirebaseConnected) {
            console.groupEnd();
            return;
        }

        // 2. Proceed with upload
        const fileIdToUploadTo = uuidv4();
        const storagePath = `users/${user.id}/files/${fileIdToUploadTo}`;
        const storageRef = ref(storage, storagePath);

        console.log("File Info:", {
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            type: file.type
        });
        console.log("Storage Path:", storagePath);

        try {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const percent = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setStatus(statusText.UPLOADING);
                    setProgress(percent);
                    console.log(`Upload progress: ${percent}%`);
                },
                (error) => {
                    console.error("Upload error:", error);
                    setStatus(statusText.FAILED);
                },
                async () => {
                    setStatus(statusText.UPLOADED);
                    console.log("File uploaded, getting download URL...");

                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    console.log("Download URL:", downloadURL);

                    setStatus(statusText.SAVING);
                    console.log("Saving to Firestore...");

                    await setDoc(doc(db, "users", user.id, "files", fileIdToUploadTo), {
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        downloadURL: downloadURL,
                        ref: uploadTask.snapshot.ref.fullPath,
                        createdAt: new Date(),
                        lastAccessed: null,
                        status: "processing"
                    });

                    console.log("Firestore document saved");
                    setStatus(statusText.GENERATING);
                    setFileId(fileIdToUploadTo);
                    console.groupEnd();
                }
            );
        } catch (error) {
            console.error("Upload failed:", error);
            setStatus(statusText.FAILED);
            console.groupEnd();
        }
    };

    return { 
        handleUpload, 
        progress, 
        status, 
        fileId 
    };
}

export default useUpload;