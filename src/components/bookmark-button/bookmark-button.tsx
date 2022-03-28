type BookmarkButtonType = {
  containerClassNames: string,
  imageClassNames: string,
  isActive: boolean,
  width: string,
  height: string,
  onClick?: () => void,
};

function BookmarkButton({ containerClassNames, imageClassNames, isActive, width, height, onClick }: BookmarkButtonType) {
  return (
    <button
      className={containerClassNames}
      type="button"
      onClick={onClick}
    >
      <svg className={imageClassNames} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{`${ isActive ? 'In' : 'To' } bookmarks`}</span>
    </button>
  );
}

export default BookmarkButton;
