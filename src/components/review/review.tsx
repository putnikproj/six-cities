import { Review as ReviewType } from '../../types/review';

import Stars from '../stars';

type ReviewBlockProps = {
  review: ReviewType;
};

function Review({ review }: ReviewBlockProps): JSX.Element {
  return (
    <li className="reviews__item">
      {/* Avatar */}
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={review.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{review.user.name}</span>
      </div>

      <div className="reviews__info">
        {/* Rating */}
        <div className="reviews__rating rating">
          <Stars containerClassNames="reviews__stars" rating={review.rating} />
        </div>

        {/* Text */}
        <p className="reviews__text">{review.comment}</p>

        {/* Time */}
        <time className="reviews__time" dateTime={review.date}>
          {new Date(review.date).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}

export default Review;
