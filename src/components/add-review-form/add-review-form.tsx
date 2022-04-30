import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { uploadReview } from '../../store/api-actions';
import { Offer } from '../../types';

import Rating from './rating';

const REVIEW_TEXT_RANGE = {
  min: 50,
  max: 300,
} as const;

const SUCCESS_UPLOAD_TEXT = 'The comment was successfully uploaded';

type AddReviewFormProps = {
  id: Offer['id'];
};

// Main component
function AddReviewForm({ id }: AddReviewFormProps) {
  const [score, setScore] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useTypedDispatch();

  // Effect that checks, should submit button be desabled or not
  useEffect(() => {
    const shouldSubmitBeEnabled = () =>
      reviewText.length >= REVIEW_TEXT_RANGE.min &&
      reviewText.length <= REVIEW_TEXT_RANGE.max &&
      score !== 0;

    if (shouldSubmitBeEnabled()) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [reviewText.length, score]);

  // Handlers that control form fields
  function handleTextAreaChange({ target }: ChangeEvent<HTMLTextAreaElement>) {
    setReviewText(target.value);
  }

  function handleRadioButtonChange({ target }: ChangeEvent<HTMLInputElement>) {
    setScore(Number(target.value));
  }

  // Form submit, also loading, error handling
  function handleError(err: unknown) {
    if (axios.isAxiosError(err)) {
      toast.error(err.message);
    }
  }

  async function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
    setIsLoading(true);

    try {
      await dispatch(
        uploadReview(id, {
          comment: reviewText,
          rating: score,
        }),
      );
    } catch (err) {
      handleError(err);
    }

    setIsLoading(false);
    setScore(0);
    setReviewText('');
    toast.success(SUCCESS_UPLOAD_TEXT);
  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <Rating score={score} onChange={handleRadioButtonChange} disabled={isLoading} />

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextAreaChange}
        value={reviewText}
        disabled={isLoading}
      ></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and
          describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isLoading || isSubmitDisabled}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default AddReviewForm;
