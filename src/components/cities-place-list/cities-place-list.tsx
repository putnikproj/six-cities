import { connect, ConnectedProps } from 'react-redux';

import { Offer } from '../../types/offer';
import { Point } from '../../types/point';
import { State } from '../../types/state';
import { PlaceCardType } from '../../const';
import { offerToPoint } from '../../util';

import PlaceCard from '../place-card/place-card';

function mapStateToProps(state: State) {
  return {
    offers: state.offers,
  };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CitiesPlaceListProps = PropsFromRedux & {
  onCardEnterLeave: (point?: Point | undefined) => void,
};

function CitiesPlaceList({ offers, onCardEnterLeave }: CitiesPlaceListProps): JSX.Element  {

  function handleMouseEnterLeave(offer?: Offer | undefined) {
    return () => {
      if (!offer) {
        onCardEnterLeave();
        return;
      }

      onCardEnterLeave(offerToPoint(offer));
    };
  }

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <div
          key={offer.id}
          onMouseEnter={handleMouseEnterLeave(offer)}
          onMouseLeave={handleMouseEnterLeave()}
        >
          <PlaceCard offer={offer} type={PlaceCardType.MAIN} />
        </div>
      ))}
    </div>
  );
}

export default connector(CitiesPlaceList);
