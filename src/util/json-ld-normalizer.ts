import { canonize, JsonLdDocument } from 'jsonld';
import { InvalidParameterException } from 'src/exception';

export class JsonLdNormalizer {
  static async normalize(document: JsonLdDocument): Promise<string> {
    const normalized = await canonize(document, {
      algorithm: 'URDNA2015',
      format: 'application/n-quads',
    });

    if (typeof normalized !== 'string') {
      InvalidParameterException.throw();
    }

    return normalized;
  }
}
