import { ChangeEvent, Fragment, useState, useEffect } from 'react';

// Rating component
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

// Main component
function AddReviewForm() {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Effect that checks, should submit button be desabled or not
  useEffect(() => {
    const shouldSubmitBeEnabled = () => reviewText.length >= 50 && score !== 0;

    if (shouldSubmitBeEnabled()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [reviewText.length, score]);

  function handleTextAreaChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(target.value);
  }

  function handleRadioButtonChange({ target }: ChangeEvent<HTMLInputElement>) {
    setScore(Number(target.value));
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating score={score} onChange={handleRadioButtonChange} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextAreaChange}
        value={reviewText}
      ></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddReviewForm;
