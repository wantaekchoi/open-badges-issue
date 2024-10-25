import { NotDefinedException } from 'src/exception/not-defined.exception';
import { BadgeClass, Profile } from './assertion-types';

export class Badge {
  private constructor(
    private readonly name: string,
    private readonly description: string,
    private readonly image: string,
    private readonly issuer: Profile,
    private readonly narrative?: string,
    private readonly tags?: string[],
    private readonly id?: string,
  ) {}

  getCriteria(): { narrative: string } | undefined {
    return this.narrative ? { narrative: this.narrative } : undefined;
  }

  toBadgeClass(): BadgeClass {
    if (!this.id) {
      NotDefinedException.throw('id');
    }
    return {
      type: 'BadgeClass',
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      criteria: this.getCriteria(),
      tags: this.tags,
      issuer: this.issuer,
    };
  }

  static withId(
    id: string,
    name: string,
    description: string,
    image: string,
    issuer: Profile,
    narrative?: string,
    tags?: string[],
  ): Badge {
    return new Badge(name, description, image, issuer, narrative, tags, id);
  }

  static withoutId(
    name: string,
    description: string,
    image: string,
    issuer: Profile,
    narrative?: string,
    tags?: string[],
  ) {
    return new Badge(name, description, image, issuer, narrative, tags);
  }
}
