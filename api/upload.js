import { put, list } from '@vercel/blob';

export const config = {
    runtime: 'edge',
};

export default async function upload(request) {
    console.log(request.method)
    if (request.method == 'POST') {
        const form = await request.formData();
        const file = form.get('file');
        const blob = await put(file.name, file, { access: 'public', multipart: true });
        return Response.json(blob);
    } else {
        const blobs = await list();
        return Response.json(blobs);
    }
}