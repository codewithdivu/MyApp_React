import _mock from './_mock';

export const _appFeatured = [...Array(3)].map((_, index) => ({
  id: _mock.id(index),
  title: ['Harry Potter and the Deathly Hallows - Part 2', 'Disney Zombies 2', 'Lightroom mobile - Koloro'][index],
  description: _mock.text.title(index),
  image: _mock.image.feed(index),
}));
