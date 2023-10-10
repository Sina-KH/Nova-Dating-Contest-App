export enum ImagePresentationType {
    medium = 'm1000'
}

export function hashToImageURL(hash?: string, presentationType?: ImagePresentationType) {
    return hash
        ? process.env.NEXT_PUBLIC_URL_MEDIA! + hash + (presentationType ? '&pt=' + presentationType : '')
        : undefined;
}

// images for interest icons are passed as a relative path on back-end public path
export function relativePathToURL(path: string) {
    if (path?.startsWith('/')) return process.env.NEXT_PUBLIC_URL_BACK + path?.substring(1);
    return path;
}
