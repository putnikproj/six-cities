import { useTypedSelector } from '../../hooks';
import { LoadStatus } from '../../helpers/enum';
import { Review as ReviewType } from '../../types';

import Review from '../review';
import Spinner from '../spinner';

const MAX_OFFER_REVIEWS = 10;

const sortReviewsByNewestDate = (reviews: ReviewType[]) =>
  [...reviews].sort((prev, next) => Date.parse(next.date) - Date.parse(prev.date));

function ReviewsList(): JSX.Element {
  const reviews = useTypedSelector((state) => state.reviews);
  const reviewsOffersLoadStatus = useTypedSelector((state) => state.reviewsLoadStatus);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {reviewsOffersLoadStatus === LoadStatus.LOADING ||
      reviewsOffersLoadStatus === LoadStatus.UNLOADED ? (
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
