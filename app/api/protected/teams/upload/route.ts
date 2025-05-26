import formidable from 'formidable';
import { NextResponse } from 'next/server';

// Disable Next.js built-in body parsing so formidable can handle it
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function POST(req: Request) {
    const form = formidable({ multiples: true });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.error('Error parsing form:', err);
                reject(NextResponse.json({ error: 'Error parsing form data' }, { status: 500 }));
                return;
            }

            // fields and files contain the parsed data
            console.log('Fields:', fields);
            console.log('Files:', files);

            // Do something with the uploaded file(s)
            // For example, save file, validate, respond

            resolve(NextResponse.json({ message: 'Upload successful', fields, files }));
        });
    });
}
