

import {PresidentProps} from '../interfaces';

const PresidentDetail = ({firstName, lastName, startYear, endYear}:PresidentProps) => {
  return (
    <div>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{startYear}</p>
        <p>{endYear}</p>
    </div>
  )
}

export default PresidentDetail
