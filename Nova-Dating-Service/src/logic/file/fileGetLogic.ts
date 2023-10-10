import { IFileResponse } from '@/helpers/aliases';
import FileRepo from '@/repos/fileRepo';
import fs from 'fs';

export async function fileGetLogic(hash: string, presentationType?: string): Promise<IFileResponse | null> {
    try {
        let file = await FileRepo.findByHash(hash);
        if (!file) return null;

        let path = file.path;
        if (!path) return null;

        if (presentationType && ['m1000', 'm500'].indexOf(presentationType) < 0) return null;

        let fullPath =
            process.env.FILE_PATH +
            (presentationType ? '/' + presentationType : '') +
            '/' +
            file.useType +
            '/' +
            file.fileType +
            '/' +
            file.path;

        // try to find with presentationType (if exists)
        try {
            // @ts-ignore
            fs.accessSync(fullPath, fs.F_OK);
            return {
                mimeType: file.mimeType,
                media: fs.createReadStream(fullPath)
            };
        } catch (e) {
            if (!presentationType) {
                // no presentation type, so file not found...
                console.log(e);
                return null;
            }
        }

        // try to find without presentationType
        fullPath = process.env.FILE_PATH + '/' + file.useType + '/' + file.fileType + '/' + file.path;
        // @ts-ignore
        fs.accessSync(fullPath, fs.F_OK);
        return {
            mimeType: file.mimeType,
            media: fs.createReadStream(fullPath)
        };
    } catch (e) {
        console.log(e);
        return null;
    }
}
