import Crypto from 'crypto';
import mkdirp from 'async-mkdirp';

import { Identifier } from '@/helpers/aliases';
import { IUser } from '@/models/user';
import { IFile, IFileProps, IFileStatus, IFileType, IFileUseType } from '@/models/file';
import { Exceptions } from '@/helpers/exceptions';
import FileRepo from '@/repos/fileRepo';
import { randomString } from '@/helpers/stringHelpers';
import { processMedia } from '@/helpers/mediaPresentation';
import Sharp from 'sharp';

export enum FileMimeFile {
    PNG = 'image/png',
    JPEG = 'image/jpeg'
}

export async function fileUploadLogic(
    file: any,
    fileType: IFileType,
    useType: IFileUseType,
    usedBy: Identifier<IUser>
) {
    if (process.env.DOCS_ENV === 'true') {
        return docsMode(fileType || IFileType.image, useType, usedBy);
    }

    const mimeType = file.mimetype;

    switch (mimeType) {
        case FileMimeFile.PNG:
            if (fileType !== IFileType.image) throw Error(Exceptions.badFileUpload);
            break;
        case FileMimeFile.JPEG:
            if (fileType !== IFileType.image) throw Error(Exceptions.badFileUpload);
            break;
        default:
            console.log('unacceptable mimeType ', mimeType);
            throw Error(Exceptions.badFileUpload);
    }

    // save media to hard drive
    let path = process.env.FILE_PATH + '/' + useType + '/' + fileType + '/';
    const fileExtension = file.name.split('.').pop();
    let fileName = Crypto.randomBytes(16).toString('hex') + '.' + fileExtension;
    await mkdirp(path);

    if (file.mv) {
        const err = await file.mv(path + fileName);
        if (err) throw Error('1001');
    } else {
        throw Error('1002');
    }

    let metaData: any = {};
    if (fileType === IFileType.image) {
        try {
            metaData = await Sharp(path + fileName).metadata(); // TODO:: optimize
        } catch (e) {
            console.log('Error getting metaData', e);
        }
    }

    // save media object in db
    let fileData: IFile = {
        name: file.name,
        mimeType: mimeType,
        hash: Crypto.randomBytes(16).toString('hex') + '.' + fileExtension,
        size: file.data.byteLength,
        path: fileName,
        fileType,
        useType,
        i: {
            w: (metaData.orientation || 1) < 5 ? metaData.width : metaData.height,
            // eslint-disable-next-line no-constant-condition
            h: metaData.orientation < 5 || 1 ? metaData.height : metaData.width
        },
        status: IFileStatus.active
    };
    switch (useType.toString()) {
        case IFileUseType.profilePhoto:
            fileData.user = <Identifier<IUser>>usedBy;
            break;
    }

    let objFile: Partial<IFile> = await FileRepo.create(fileData);
    objFile = objFile.to!(IFileProps.general);

    switch (fileType) {
        case IFileType.image.toString():
            await processMedia(objFile._id!);
            break;
    }

    return objFile;
}

async function docsMode(fileType: IFileType, useType: IFileUseType, usedBy?: Identifier<IUser>) {
    let mimeType = '';
    switch (fileType.toString()) {
        case IFileType.image:
            mimeType = FileMimeFile.PNG;
            break;
        default:
            throw Error(Exceptions.badFileUpload);
    }
    let fileData: IFile = {
        name: randomString(5),
        mimeType: mimeType,
        hash: Crypto.randomBytes(16).toString('hex'),
        size: 1000,
        path: randomString(10),
        fileType,
        useType,
        status: IFileStatus.active
    };
    switch (useType.toString()) {
        case IFileUseType.profilePhoto:
            fileData.user = <Identifier<IUser>>usedBy;
            break;
    }

    let objFile: Partial<IFile> = await FileRepo.create(fileData);
    objFile = objFile.to!(IFileProps.general);

    return objFile;
}
