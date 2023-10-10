import mkdirp from 'async-mkdirp';
import Sharp from 'sharp';
import { ObjectIDType } from './aliases';
import { IFile, IFileType, IFileUseType } from '@/models/file';
import FileRepo from '@/repos/fileRepo';

export async function processMedia(mediaID: ObjectIDType<IFile>) {
    const media = await FileRepo.findByID(mediaID);
    if (media) {
        return await processMediaObj(media);
    }
}

export async function processMediaObj(media: IFile) {
    try {
        switch (media.fileType.toString()) {
            case IFileType.image:
                /*
                  Image presentation types are :
                      b1000.  `1000 x X` size image with low quality and blur.

                      m1000.  `1000 x X` size image with medium quality.

                      m500.  `500 x X` size image with medium quality.
               */

                switch (media.useType.toString()) {
                    case IFileUseType.profilePhoto:
                        // create directory if needed
                        const outputPathM1000 =
                            process.env.FILE_PATH + '/m1000/' + media.useType + '/' + media.fileType + '/' + media.path;
                        await mkdirp(outputPathM1000.substr(0, outputPathM1000.lastIndexOf('/')));
                        // sharp it!
                        await Sharp(
                            process.env.FILE_PATH + '/' + media.useType + '/' + media.fileType + '/' + media.path
                        )
                            .rotate()
                            .flatten({ background: { r: 255, g: 255, b: 255 } })
                            .resize({
                                width: Math.min(media.i?.w || 1000, 1000),
                                height: Math.min(media.i?.h || 1000, 1000),
                                fit: Sharp.fit.inside,
                                position: Sharp.strategy.entropy
                            })
                            .jpeg({
                                quality: 80,
                                chromaSubsampling: '4:4:4'
                            })
                            .toFile(outputPathM1000);

                        // create directory if needed
                        const outputPathM500 =
                            process.env.FILE_PATH + '/m500/' + media.useType + '/' + media.fileType + '/' + media.path;
                        await mkdirp(outputPathM500.substr(0, outputPathM500.lastIndexOf('/')));
                        // sharp it!
                        await Sharp(
                            process.env.FILE_PATH + '/' + media.useType + '/' + media.fileType + '/' + media.path
                        )
                            .rotate()
                            .flatten({ background: { r: 255, g: 255, b: 255 } })
                            .resize({
                                width: Math.min(media.i?.w || 500, 500),
                                height: Math.min(media.i?.h || 500, 500),
                                fit: Sharp.fit.inside,
                                position: Sharp.strategy.entropy
                            })
                            .jpeg({
                                quality: 60,
                                chromaSubsampling: '4:4:4'
                            })
                            .toFile(outputPathM500);
                        break;
                }
        }
    } catch (e) {
        console.log('error in processing media', media);
        console.log(e);
    }
}
