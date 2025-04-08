// lib/cloudinary/client/index.ts
export async function getImages(folder: string) {
    const response = await fetch(`/api/covers`);
    return response.json();
}

export async function uploadImage(file: string, folder: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch('/api/covers', {
        method: 'POST',
        body: formData
    });
    return response.json();
}

export async function deleteImage(publicId: string) {
    const response = await fetch('/api/covers', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ publicId })
    });
    return response.json();
}