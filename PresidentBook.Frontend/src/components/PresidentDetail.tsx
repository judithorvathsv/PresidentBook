

import { useNavigate } from 'react-router-dom';
import {PresidentProps} from '../interfaces';


const PresidentDetail = ({id, firstName, lastName, startYear, endYear}:PresidentProps) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/api/v1/PresidentBook/presidents/${id}`)
  }
  return (
    <div>
        <p>{firstName}</p>
        <p>{lastName}</p>
        <p>{startYear}</p>
        <p>{endYear}</p>
        <button onClick={handleEdit}>Edit</button>
    </div>
  )
}

export default PresidentDetail
