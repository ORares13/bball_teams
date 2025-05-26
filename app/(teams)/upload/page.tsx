'use client';

import { useState } from 'react';

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) setFile(e.target.files[0]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/teams/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                setMessage('File uploaded successfully!');
                console.log('Upload response:', data);
            } else {
                setMessage('Upload failed: ' + data.error);
            }
        } catch (error) {
            setMessage('Upload error');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="file" onChange={handleFileChange} />
            <button type="submit" disabled={!file} className="btn">
                Upload
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
