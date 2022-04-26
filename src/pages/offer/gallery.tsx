import { Offer } from '../../types';
import { MAX_OFFER_IMAGES } from '../../helpers/const';

function Gallery({ images }: { images: Offer['images'] }) {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.map(
          (image, index) =>
            index < MAX_OFFER_IMAGES && (
              // There I can use index as key, because this elem is static, it won't be changed
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="property__image-wrapper">
                <img className="property__image" src={image} alt="studio" />
              </div>
            ),
        )}
      </div>
    </div>
  );
}

export default Gallery;
