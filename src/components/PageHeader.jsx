import { useNavigate } from 'react-router-dom';
import Icon from './Icon';
import { I } from '../data/icons';

export default function PageHeader({ title, back }) {
  const navigate = useNavigate();
  return (
    <div className="mtop">
      <button className="back" onClick={() => (back ? navigate(back) : navigate(-1))} aria-label="Back">
        <Icon path={I.back} color="#EEF0EA" size={15} />
      </button>
      <div className="mtitle">{title}</div>
    </div>
  );
}
