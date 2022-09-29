import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Injectable()
export class PicturesService {
  private s3;

  constructor(private readonly prisma: PrismaService) {}

  async create(pictures, accidentId: string) {
    const pictureId = await this.insertObject(pictures);
    await this.createPictureDatabase(
      accidentId,
      pictureId,
      pictures.originalname,
    );
  }

  async get(accidentId: string) {
    const picturesObject = [];
    const picturesAccident = await this.getPictures(accidentId);
    const verifyObject = await this.verifyList(picturesAccident);

    console.log(verifyObject);
    for (const picture of verifyObject) {
      const object = await this.getImagesFromBucket(picture.url);
      console.log(object);
      const data = {
        name: picture.name,
        object: object.Body,
      };
      picturesObject.push(data);
    }
    return picturesObject;
  }

  async getPictures(accidentId: string) {
    return this.prisma.pictures.findMany({
      where: {
        accidentId: accidentId,
      },
      take: 4,
      select: {
        url: true,
        name: true,
      },
    });
  }

  async createPictureDatabase(
    accidentId: string,
    pictureId: string,
    pictureName: string,
  ) {
    await this.prisma.pictures.create({
      data: {
        name: pictureName,
        url: pictureId,
        accidentId: accidentId,
      },
    });
  }

  s3init() {
    return new AWS.S3({
      credentials: {
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY,
      },
      s3ForcePathStyle: true,
      endpoint: process.env.ENDPOINT,
    });
  }

  async verifyList(picturesAccident) {
    const listObject = await this.s3init()
      .listObjects({
        Bucket: 'user',
      })
      .promise();

    const listObjectPictures = listObject.Contents.map((object) => object.Key);

    console.log(listObjectPictures);
    return picturesAccident.filter((pictures) => {
      return !listObjectPictures.includes(pictures.Key);
    });
  }

  async insertObject(data): Promise<string> {
    console.log(data);
    const id = randomUUID();
    console.log(this.s3init());
    await this.s3init()
      .putObject({
        Bucket: 'user',
        Key: id,
        Body: data.buffer,
      })
      .promise();

    return id.toString();
  }

  async getImagesFromBucket(imageId: string) {
    return await this.s3init()
      .getObject({
        Bucket: 'user',
        Key: imageId,
      })
      .promise();
  }
}
