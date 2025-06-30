'use client';
import { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { CircleArrowDown, Rocket, Save, Hammer } from 'lucide-react';
import  useUpload, { statusText }  from '@/Hooks/useUpload';
import { useRouter } from 'next/router';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

function FileUploader() {
  const{ progress, status, fileId, handleUpload} = useUpload();
  const router = useRouter()
  
 useEffect(() => {
  if (fileId) {
    router.push(`/dashboard/files/${fileId}`);
  }
 }, [fileId, router]);
    

  const onDrop = useCallback(async(acceptedFiles: File[]) => {
    console.log("Dropped files:",acceptedFiles);

    const file = acceptedFiles[0];
     if (file) {
       await handleUpload(file);
    } else {
     //do nothing
     //toast....
    }
  }, [handleUpload]); //index was "[]" before copilot.
  
    

 const statusIcons: { 
  [key in statusText]: React.ReactNode;
 } = {
  [statusText.UPLOADING]: (
    <Rocket className='h-20 w-20 text-indigo-600' />
  ),
  [statusText.UPLOADED]: (
    <CheckCircleIcon className='h-20 w-20 text-indigo-600' />
  ),
  [statusText.SAVING]: <Save className="h-20 w-20 text-indigo-600" />,
  [statusText.GENERATING]: (
    <Hammer className='h-20 w-20 text-indigo-600 animate-bounce' />
  ),
 };



  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = 
  useDropzone({ 
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
    }, 
  });

 const uploadInProgress = progress != null && progress >= 0 && progress <= 100;

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto ">
      {/* Loading state */}
       { uploadInProgress && (

        <div className='mt-32 flex flex-col justify-center items-center gap-5'>
          <div className={`radial-progress bg-indigo-300 text-white border-indigo-600 border-4 ${progress === 100 && "hidden"
          }`}
          role = 'progressbar'
          style={{
             // @ts-expect-error there is no type for this
             '--value': progress,
             '--size': '12rem',
             '--thickness': '1.3rem',}}
          >
            {progress} %
          </div>

          {/* {Render Status Icon} */}

          {
           
            statusIcons[status!]
          }

          <p className='text-indigo-600 animate-pulse'>{status}</p>
        </div>
       )}

      <div {...getRootProps()} className={`p-10 border-2 border-dashed mt-10 w-[90%]
         border-indigo-600 text-indigo-600 rounded-lg
          h-96 flex items-center justify-center ${isFocused || isDragAccept ? 'bg-indigo-400' : 'bg-indigo-100'}`}>
        <input {...getInputProps()} />


        <div className="flex flex-col items-center justify-center ">
          {isDragActive ? (
            <>
            <Rocket className="h-20 w-20 animate-ping" />
            <p>Drop the files here ...</p>
            </>
          ) : (
            <>
            <CircleArrowDown className="h-20 w-20 animate-bounce" />
             <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
            </>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default FileUploader;
