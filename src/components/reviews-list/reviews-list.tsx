import { useTypedSelector } from '../../hooks';
import { reviewsSelector } from '../../store/slices/active-offer';
import { Review as ReviewType } from '../../types';

import Review from '../review';
import Spinner from '../spinner';

const MAX_OFFER_REVIEWS = 10;

const sortReviewsByNewestDate = (reviews: ReviewType[]) =>
  [...reviews].sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));

type ReviewsListProps = {
  isLoading: boolean;
};

function ReviewsList({ isLoading }: ReviewsListProps): JSX.Element {
  const reviews = useTypedSelector(reviewsSelector);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {isLoading ? (
        <Spinner centerX centerY />
      ) : (
        <ul className="reviews__list">
          {sortReviewsByNewestDate(reviews).map(
            (review, index) =>
              index < MAX_OFFER_REVIEWS && <Review key={review.id} review={review} />,
          )}
        </ul>
      )}
    </>
  );
}

export default ReviewsList;
