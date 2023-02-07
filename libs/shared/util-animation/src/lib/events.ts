export type Collision = Collided | NonCollided;
export type NonCollided = 'NonCollided';
export type Collided = {
  readonly objectsCollided: Figures;
};
