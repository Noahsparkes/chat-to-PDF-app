'use client';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {CircleArrowDown,RocketIcon,
      
} from 'lucide-react';

function FileUploader() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept } = useDropzone({ onDrop });

  return (
    <div className="flex flex-col gap-4 items-center max-w-7xl mx-auto ">
      {/* Loading state */}
      <div {...getRootProps()} className={`p-10 border-2 border-dashed mt-10 w-[90%]
         border-indigo-600 text-indigo-600 rounded-lg
          h-96 flex items-center justify-center ${isFocused || isDragAccept ? 'bg-indigo-400' : 'bg-indigo-100'}`}>
        <input {...getInputProps()} />


        <div className="flex flex-col items-center justify-center ">
          {isDragActive ? (
            <>
            <RocketIcon className="h-20 w-20 animate-ping" />
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

/*
import {CheckCircleIcon,
CircleArrowDown,
HammerIcon,
RocketIcon,
SaveIcon
} from 'lucide-react';
 */