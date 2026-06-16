import Color from 'color';

export const fcc = (color: string) => {
  const white = Color('white');
  const _color = Color(color).contrast(white);
  return _color > 2 ? 'white' : 'black';
};
