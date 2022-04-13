import { useTypedSelector } from '../../hooks/useTypedSelector';
import { MAX_OFFER_REVIEWS } from '../../helpers/const';

import Review from '../review';

function ReviewsList(): JSX.Element {
  const reviews = useTypedSelector((state) => state.reviews);

  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map(
          (review, index) =>
            index < MAX_OFFER_REVIEWS && <Review key={review.id} review={review} />,
        )}
      </ul>
    </>
  );
}

export default ReviewsList;
