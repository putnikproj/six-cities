import { Reviews } from '../../types/review';

import ReviewBlock from '../review/review';

type ReviewsListProps = {
  reviews: Reviews
  maxReviews: number,
}

function ReviewsList({reviews, maxReviews}: ReviewsListProps): JSX.Element {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review, index) => (index < maxReviews) && (<ReviewBlock key={review.id} review={review} />))}
      </ul>
    </>
  );
}

export default ReviewsList;
