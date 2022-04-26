import { ChangeEvent, Fragment } from 'react';

type RatingProps = {
  score: number;
  onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void;
};

function Rating({ score, onChange }: RatingProps) {
  type star = {
    value: number;
    title: string;
  };
  const stars: star[] = [
    { value: 5, title: 'perfect' },
    { value: 4, title: 'good' },
    { value: 3, title: 'not bad' },
    { value: 2, title: 'badly' },
    { value: 1, title: 'terribly' },
  ];

  return (
    <div className="reviews__rating-form form__rating">
      {stars.map(({ value, title }: star) => (
        <Fragment key={value}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={`${value}-stars`}
            type="radio"
            checked={score === value}
            onChange={onChange}
          />
          <label
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
          </label>
        </Fragment>
      ))}
    </div>
  );
}

export default Rating;
