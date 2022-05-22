import { LoadingStatus } from '../../helpers/enum';
import { useTypedSelector } from '../../hooks';
import {
  reviewsLoadingStatusSelector,
  sortedReviewsSelector,
} from '../../store/slices/active-offer';

import Review from '../review';
import Spinner from '../spinner';

function ReviewsList(): JSX.Element {
  const reviews = useTypedSelector(sortedReviewsSelector);
  const loadingStatus = useTypedSelector(reviewsLoadingStatusSelector);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      {loadingStatus === LoadingStatus.LOADING ? (
        <Spinner centerX centerY />
      ) : (
        <ul className="reviews__list">
          {reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </ul>
      )}
    </>
  );
}

export default ReviewsList;
