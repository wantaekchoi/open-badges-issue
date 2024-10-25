import { ContentType } from 'src/constant';
import { InvalidParameterException } from 'src/exception';

export class Base64ImageHandler {
  private static readonly regex = /^data:image\/(\w+);base64,/;

  static encodeBase64Image(data: Buffer, mimeType: ContentType): string {
    const base64Data = data.toString('base64');
    return `data:image/${mimeType};base64,${base64Data}`;
  }

  static decodeBase64Image(base64Encoded: string): Buffer {
    const base64Data = base64Encoded.replace(/^data:image\/\w+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
  }

  static extractContentType(base64Encoded: string): ContentType {
    const matches = base64Encoded.match(Base64ImageHandler.regex);
    if (!matches?.[1]) {
      InvalidParameterException.throw();
    }
    return matches[1].toLowerCase() as ContentType;
  }
}
