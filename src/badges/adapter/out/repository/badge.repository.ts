import { Badge, Profile } from 'src/badges';
import { BadgeEntity, ProfileEntity } from 'src/infra';
import { LoadBadgePort } from 'src/badges/application/';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataFetchException } from 'src/exception';

export class BadgeRepository implements LoadBadgePort {
  constructor(
    @InjectRepository(BadgeEntity)
    private readonly badgeRepository: Repository<BadgeEntity>,
  ) {}

  async loadOneByIdOrFail(id: string): Promise<Badge> {
    try {
      const badge = await this.badgeRepository.findOneByOrFail({ id });
      return BadgeRepository.entityToDomain(badge);
    } catch (error) {
      DataFetchException.throw();
    }
  }

  private static profileEntityToProfile({
    id,
    name,
    url,
    description,
    image,
    email,
  }: ProfileEntity): Profile {
    const uri = `urn:uuid${id}`;
    return {
      id: uri,
      type: 'Issuer',
      name,
      url,
      description,
      image: `urn:uuid:${image.id}`,
      email,
      revocationList: `${uri}#`,
    };
  }

  static entityToDomain({
    id,
    name,
    description,
    image,
    issuer,
    narrative,
    tags,
  }: BadgeEntity): Badge {
    return Badge.withId(
      id,
      name,
      description,
      image,
      BadgeRepository.profileEntityToProfile(issuer),
      narrative,
      tags.map(({ name }) => name),
    );
  }
}
