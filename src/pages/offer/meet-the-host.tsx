import classNames from 'classnames';

import { Offer, User } from '../../types';

function MeetTheHost({ host, description }: { host: User; description: Offer['description'] }) {
  return (
    <div className="property__host">
      <h2 className="property__host-title">Meet the host</h2>

      {/* Avatar */}
      <div className="property__host-user user">
        <div
          className={classNames('property__avatar-wrapper', 'user__avatar-wrapper', {
            'property__avatar-wrapper--pro': host.isPro,
          })}
        >
          <img
            className="property__avatar user__avatar"
            src={host.avatarUrl}
            width="74"
            height="74"
            alt="Host avatar"
          />
        </div>
        <span className="property__user-name">{host.name}</span>
        {host.isPro && <span className="property__user-status">Pro</span>}
      </div>

      {/* Description */}
      <div className="property__description">
        <p className="property__text">{description}</p>
      </div>
    </div>
  );
}

export default MeetTheHost;
