import { ChangeEvent, useState } from 'react';

// Star component
type StarProps = {
  value: number,
  score: number,
  title: string,
  onChange: ({ target }: ChangeEvent<HTMLInputElement>) => void,
};
function Star({value, score, title, onChange}: StarProps) {
  return (
    <>
      <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" checked={score === value} onChange={onChange} />
      <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

// Main component
function AddReviewForm() {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');

  function handleTextAreaChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(target.value);
  }

  function handleRadioButtonChange({ target }: ChangeEvent<HTMLInputElement>) {
    setScore(Number(target.value));
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        <Star value={5} score={score} title="perfect" onChange={handleRadioButtonChange} />
        <Star value={4} score={score} title="good" onChange={handleRadioButtonChange} />
        <Star value={3} score={score} title="not bad" onChange={handleRadioButtonChange} />
        <Star value={2} score={score} title="badly" onChange={handleRadioButtonChange} />
        <Star value={1} score={score} title="terribly" onChange={handleRadioButtonChange} />
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextAreaChange}
        value={reviewText}
      >
      </textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled>Submit</button>
      </div>

    </form>
  );
}

export default AddReviewForm;
