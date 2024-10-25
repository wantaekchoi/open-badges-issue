export interface SavePort<Entity> {
  save(entity: Entity): Promise<Entity>;
  saveAll(entities: Entity[]): Promise<Entity[]>;
}
