import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';

import { Offer } from '../../types/offer';
import { PlaceCardType } from '../../const';
import { ActionsType, setActiveOffer } from '../../store/action';

import PlaceCard from '../place-card/place-card';
import PlacesSorting from '../places-sorting/places-sorting';
import { State } from '../../types/state';

function mapDispatchToProps(dispatch: Dispatch<ActionsType>) {
  return {
    сhangeActiveOffer(newActiveOffer: State['activeOffer']) {
      dispatch(setActiveOffer({ activeOffer: newActiveOffer }));
    },
  };
}


const connector = connect(null, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type CitiesPlaceListProps = PropsFromRedux & {
  offers: Offer[],
};

function CitiesPlaceList({ offers, сhangeActiveOffer }: CitiesPlaceListProps): JSX.Element  {

  function handleMouseEnterLeave(offer?: Offer | undefined) {
    return () => {
      if (!offer) {
        сhangeActiveOffer(null);
        return;
      }

      сhangeActiveOffer(offer);
    };
  }

  return (
    <section className="cities__places places">
      {/* Title */}
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{`${offers.length} ${offers.length === 1 ? 'place' : 'places'}`} to stay in Amsterdam</b>

      {/* Sorting */}
      <PlacesSorting />

      {/* Places (offers) */}
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
    </section>
  );
}

export default connector(CitiesPlaceList);
