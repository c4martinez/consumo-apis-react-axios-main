import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons";

const FiveStarRating = ({ rating }) => {
  // Declare star icon array
  const starList = [];

  // Store number of filled stars
  const starFillCount = Math.floor(rating); // 4

  // Store if yes or no there is a half star
  const hasHalfStar = rating - parseInt(rating) >= 0.5; // 4.35 - 4 = 4 >= 0.5 = false

  // Store number of empty stars
  const emptyStarCount = 5 - starFillCount - (hasHalfStar ? 1 : 0); // 5 - 4 - 0 = 1

  // Push the filled stars icons
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }

  // Push the empty stars icons
  for(let i = 1; i <= emptyStarCount; i++){
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }

  return <div>{starList}</div>;
};

export default FiveStarRating;
