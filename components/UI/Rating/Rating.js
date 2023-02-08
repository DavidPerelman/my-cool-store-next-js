import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import classes from './Rating.module.css';

const Rating = ({ rating, size }) => {
  return (
    <div className={classes.rating}>
      <span>
        <FontAwesomeIcon
          size='lg'
          icon={rating >= 1 ? faStar : rating >= 0.5 ? faStarHalfAlt : faStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          size='lg'
          icon={rating >= 2 ? faStar : rating >= 1.5 ? faStarHalfAlt : faStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          size='lg'
          icon={rating >= 3 ? faStar : rating >= 2.5 ? faStarHalfAlt : faStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          size='lg'
          icon={rating >= 4 ? faStar : rating >= 3.5 ? faStarHalfAlt : faStar}
        />
      </span>
      <span>
        <FontAwesomeIcon
          size='lg'
          icon={rating >= 5 ? faStar : rating >= 4.5 ? faStarHalfAlt : faStar}
        />
      </span>
    </div>
  );
  // return (
  //   <div className={classes.rating}>
  //     <span>
  //       <i
  //         className={
  //           rating >= 1
  //             ? 'fas fa-star'
  //             : rating >= 0.5
  //             ? 'fas fa-star-half-alt'
  //             : 'far fa-star'
  //         }
  //       ></i>
  //     </span>
  //     <span>
  //       <i
  //         className={
  //           rating >= 2
  //             ? 'fas fa-star'
  //             : rating >= 1.5
  //             ? 'fas fa-star-half-alt'
  //             : 'far fa-star'
  //         }
  //       ></i>
  //     </span>
  //     <span>
  //       <i
  //         className={
  //           rating >= 3
  //             ? 'fas fa-star'
  //             : rating >= 2.5
  //             ? 'fas fa-star-half-alt'
  //             : 'far fa-star'
  //         }
  //       ></i>
  //     </span>
  //     <span>
  //       <i
  //         className={
  //           rating >= 4
  //             ? 'fas fa-star'
  //             : rating >= 3.5
  //             ? 'fas fa-star-half-alt'
  //             : 'far fa-star'
  //         }
  //       ></i>
  //     </span>
  //     <span>
  //       <i
  //         className={
  //           rating >= 5
  //             ? 'fas fa-star'
  //             : rating >= 4.5
  //             ? 'fas fa-star-half-alt'
  //             : 'far fa-star'
  //         }
  //       ></i>
  //     </span>
  //   </div>
  // );
};

export default Rating;
