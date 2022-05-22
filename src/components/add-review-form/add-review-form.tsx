import { ChangeEvent, useState, useEffect, FormEvent } from 'react';
import { toast, ToastContentProps } from 'react-toastify';

import { useTypedDispatch } from '../../hooks';
import { uploadReview } from '../../store/slices/active-offer';
import { Offer } from '../../types';
import { APIError } from '../../helpers/api';

import Rating from './rating';

const REVIEW_TEXT_RANGE = {
  min: 50,
  max: 300,
} as const;

enum UploadText {
  PENDING = 'The comment is uploading...',
  SUCCESS = 'The comment was successfully uploaded',
  ERROR_FALLBACK = 'Something went wrong in uploading',
}

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

  async function handleFormSubmit(evt: FormEvent) {
    evt.preventDefault();
    setIsLoading(true);

    const uploadPromise = dispatch(
      uploadReview({
        id,
        review: {
          comment: reviewText,
          rating: score,
        },
      }),
    ).unwrap();

    toast.promise(uploadPromise, {
      pending: UploadText.PENDING,
      success: UploadText.SUCCESS,
      error: {
        render: ({ data }: ToastContentProps<APIError>) =>
          data ? `Can't upload review. ${data.message}` : UploadText.SUCCESS,
      },
    });

    setIsLoading(false);
    setScore(0);
    setReviewText('');
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
