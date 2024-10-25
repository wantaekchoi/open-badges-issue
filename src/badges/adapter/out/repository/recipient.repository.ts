import { InjectRepository } from '@nestjs/typeorm';
import { Recipient } from 'src/badges';
import { LoadRecipientPort, SaveRecipientPort } from 'src/badges/application';
import { RecipientEntity } from 'src/infra';
import { In, Repository } from 'typeorm';

export class RecipientRepository
  implements LoadRecipientPort, SaveRecipientPort
{
  constructor(
    @InjectRepository(RecipientEntity)
    private readonly recipientRepository: Repository<RecipientEntity>,
  ) {}

  async loadAllByIds(ids: string[]): Promise<Recipient[]> {
    const [recipients] = await this.recipientRepository.findAndCountBy({
      id: In(ids),
    });
    return recipients.map((recipient) =>
      RecipientRepository.entityToDomain(recipient),
    );
  }

  save(entity: Recipient): Promise<Recipient> {
    throw new Error('Method not implemented.');
  }

  saveAll(entities: Recipient[]): Promise<Recipient[]> {
    throw new Error('Method not implemented.');
  }

  static entityToDomain({
    id,
    publicKey,
    name,
    email,
    salt,
    hash,
  }: RecipientEntity): Recipient {
    return Recipient.withId(id, publicKey.publicKey, name, email, salt, hash);
  }

  static domainToEntity({ id, name, salt, hash }: Recipient): RecipientEntity {
    const entity = RecipientEntity;
    entity.id = id;
    entity.name = name;
    entity.salt = salt;
    entity.hash = hash;
  }
}
