import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import Image from 'next/image';
import {FiX} from 'react-icons/fi';
import ActionButton from "@/components/buttons/ActionButton";
import {SelectedImgDetails, SingleFileUploadProps} from "@/types/FormInputs";
import {If} from "@/components/utils/If";

const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
                                                               onFileSelect,
                                                               label,
                                                               errorMessage,
                                                               disabled,
                                                           }) => {

    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [imageDetails, setImageDetails] = useState<SelectedImgDetails | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const selectedFile = acceptedFiles[0];
            setFile(selectedFile);
            onFileSelect(selectedFile);

            const previewUrl = URL.createObjectURL(selectedFile);
            setPreview(previewUrl);

            const reader = new FileReader();
            reader.onload = (e) => {
                const tempImage = document.createElement('img');
                tempImage.src = e.target?.result as string;
                tempImage.onload = () => {
                    setImageDetails({
                        width: tempImage.width,
                        height: tempImage.height,
                        size: selectedFile.size,
                    });
                };
            };
            reader.readAsDataURL(selectedFile);

            return () => {
                URL.revokeObjectURL(previewUrl);
            };
        } else {
            setPreview(null);
            setImageDetails(null);
            onFileSelect(null);
        }
    }, [onFileSelect]);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg']
        },
        multiple: false,
    });

    const removeFile = (e: any) => {
        e.preventDefault();
        if (file) {
            URL.revokeObjectURL(preview!);
            setFile(null);
            setPreview(null);
            setImageDetails(null);
            onFileSelect(null);
        }
    };

    const editImage = (e: any) => {
        e.preventDefault();
        if (file) {
            // TODO: Implement edit image functionality
        }
    };

    return (
        <div className={`${disabled && "pointer-events-none"}`}>
            <If condition={!!label}>
                <label className={`inline-block mb-2`}>
                    {label}
                </label>
            </If>
            <div
                className={`preview-component intro-y box text-center
                ${!!errorMessage ? "border border-red-500" : "border border-slate-200"} `}
            >
                <If condition={!preview}>
                    <div className="p-5">
                        <div
                            {...getRootProps()}
                            className="border-2 border-dashed dropzone p-5 dark:bg-darkmode-600 dark:border-white/5
                            cursor-pointer"
                        >
                            <input {...getInputProps()} />
                            <p className="text-base font-medium">
                                Drop files here or click to upload.
                            </p>
                        </div>
                    </div>
                </If>
                <If condition={!!preview}>
                    <div className="relative m-5 px-4 py-2 border-2 border-dashed dark:border-white/5">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                            <div className="space-y-6 flex justify-center items-center">
                                <div className="relative p-1">
                                    <Image
                                        src={preview!}
                                        alt="Selected file"
                                        className="mt-2 w-full h-auto rounded-md shadow-lg"
                                        width={100}
                                        height={100}
                                    />
                                    <button
                                        className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white"
                                        onClick={removeFile}
                                        aria-label="Remove image"
                                    >
                                        <FiX size={20}/>
                                    </button>
                                </div>
                            </div>
                            <div className="md:col-span-2 space-y-6 text-start">
                                {imageDetails && (
                                    <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-3">
                                        <p>Resolution: {imageDetails.width} x {imageDetails.height} px</p>
                                        <p>Size: {(imageDetails.size / 1024).toFixed(2)} KB</p>
                                    </div>
                                )}
                                <div className="mt-4 flex space-x-4">
                                    <ActionButton color="primary" onClick={editImage}>Edit Image</ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </If>
            </div>
            <If condition={!!errorMessage}>
                <small className="text-red-500 px-2">{errorMessage}</small>
            </If>
        </div>
    );
};

export default SingleFileUpload;
