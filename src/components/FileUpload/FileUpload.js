import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from 'semantic-ui-react';

const FileUpload = ({ addFile }) => {
    const [fileName, setFileName] = useState('');
    const onDrop = useCallback(
        acceptedFiles => {
            setFileName(acceptedFiles[0].name);
            addFile(acceptedFiles[0]);
        },
        [addFile],
    );
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });
    return (
        <>
            <div
                {...getRootProps()}
                className={`dropzone ${isDragActive && 'isActive'}`}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Button
                        fluid
                        content="Drop picture here"
                        labelPosition="left"
                        icon="file"
                        onClick={e => e.preventDefault()}
                        style={{ marginBottom: '1rem' }}
                    />
                ) : (
                    <Button
                        fluid
                        content={fileName || "Drag 'n drop, or add picture"}
                        labelPosition="left"
                        icon="file"
                        onClick={e => e.preventDefault()}
                        style={{ marginBottom: '1rem' }}
                    />
                )}
            </div>
        </>
    );
};
export default FileUpload;
