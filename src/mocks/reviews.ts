import { Reviews } from '../types/offer';

export const reviews: Reviews = [
  {
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    date: '2019-05-08T14:13:56.569Z',
    id: 1,
    rating: 4,
    user: {
      avatarUrl: 'img/1.png',
      id: 4,
      isPro: false,
      name: 'Max',
    },
  },
  {
    comment: 'Bad',
    date: '2019-09-07T14:13:56.569Z',
    id: 2,
    rating: 2,
    user: {
      avatarUrl: 'img/2.png',
      id: 9,
      isPro: true,
      name: 'Maxim',
    },
  },
];
