import { ChangeEvent, useState } from 'react';

function AddReviewForm() {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');

  function handleTextAreaChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(target.value);
  }

  function handleRadioButtonChange({ target }: ChangeEvent<HTMLInputElement>) {
    setScore(Number(target.value));
  }

  // Star component
  type StarProps = {
    value: number,
    title: string,
  }
  function Star({value, title}: StarProps) {
    return (
      <>
        <input className="form__rating-input visually-hidden" name="rating" value={value} id={`${value}-stars`} type="radio" checked={score === value} onChange={handleRadioButtonChange} />
        <label htmlFor={`${value}-stars`} className="reviews__rating-label form__rating-label" title={title}>
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </>
    );
  }

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>

      <div className="reviews__rating-form form__rating">
        <Star value={5} title="perfect" />
        <Star value={4} title="good" />
        <Star value={3} title="not bad" />
        <Star value={2} title="badly" />
        <Star value={1} title="terribly" />
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
