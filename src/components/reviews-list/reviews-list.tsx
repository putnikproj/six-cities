import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LoadStatus } from '../../helpers/enum';

import Review from '../review';
import Spinner from '../spinner';

const MAX_OFFER_REVIEWS = 10;

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
          {reviews.map(
            (review, index) =>
              index < MAX_OFFER_REVIEWS && <Review key={review.id} review={review} />,
          )}
        </ul>
      )}
    </>
  );
}

export default ReviewsList;
