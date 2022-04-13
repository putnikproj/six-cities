type StarsProps = {
  containerClassNames: string;
  rating: number;
};

function Stars({ containerClassNames, rating }: StarsProps) {
  return (
    <div className={`rating__stars ${containerClassNames}`}>
      <span style={{ width: `${0 + Math.round(rating) * 20}%` }}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default Stars;
