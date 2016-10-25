export const GENRES = [
  'chill',
  'deep',
  'dubstep',
  'house',
  'progressive',
  'tech',
  'trance',
  'tropical',
];

export const GENRES_MAP = GENRES.reduce((obj, genre) =>
  Object.assign({}, obj, {
    [genre]: 1,
  }), {});
