import { ContentType } from 'src/constant';
import { InvalidParameterException } from 'src/exception';
import { Base64ImageHandler, Crypto } from 'src/util';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('image')
export class ImageEntity {
  private static supportedType: { [key: string]: ContentType } = {
    PNG: ContentType.PNG,
    JPG: ContentType.JPG,
    SVG: ContentType.SVG,
  };

  @PrimaryGeneratedColumn('uuid', {
    name: 'id',
  })
  id: string;

  @Column({ name: 'blob', type: 'longblob' })
  blob: Buffer;

  @Column({
    name: 'type',
    type: 'text',
    enum: [Object.values<ContentType>(ImageEntity.supportedType)],
  })
  type: ContentType;

  @Column({
    name: 'hash',
    type: 'binary',
    length: 32,
  })
  hash: Buffer;

  @BeforeInsert()
  @BeforeUpdate()
  private updateHash(): this {
    this.hash = Crypto.sha256(this.blob);
    return this;
  }

  setImage(base64Encoded: string): this {
    try {
      const type = Base64ImageHandler.extractContentType(base64Encoded);
      if (!this.isSupported(type)) {
        InvalidParameterException.throw();
      }
      this.type = type;
      this.blob = Base64ImageHandler.decodeBase64Image(base64Encoded);
      return this;
    } catch (error) {
      InvalidParameterException.throw();
    }
  }

  getBase64EncodedImage(): string {
    return Base64ImageHandler.encodeBase64Image(this.blob, this.type);
  }

  private isSupported(type: ContentType): type is ContentType {
    return Object.values<ContentType>(ImageEntity.supportedType).includes(type);
  }
}
