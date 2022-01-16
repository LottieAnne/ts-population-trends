import '../../styles.css';
import { VFC } from 'react';
import { Prefecture } from '../types/api/prefecture';

// Component of all prefectures with checkbox
const CheckField: VFC<Prefecture> = ({ prefectures, onChange }) => {
  return (
    <>
      <div className="PrefectureList">
        {prefectures.map((prefecture) => (
          <label key={prefecture.prefName} className="PrefectureCard">
            <input
              type="checkbox"
              name="Prefecture name"
              onChange={(event) =>
                onChange(
                  prefecture.prefName,
                  prefecture.prefCode,
                  event.target.checked
                )
              }
              id={'checkbox' + prefecture.prefCode}
            />
            <span className="checkmark"></span>
            {prefecture.prefName.length === 3 ?  prefecture.prefName + "　" : prefecture.prefName}
          </label>
        ))}
      </div>
    </>
  );
};

export default CheckField;
