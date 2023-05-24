import { ReactComponent as CheckedIcon } from 'assets/icons/checked.svg';
import { ReactComponent as UncheckedIcon } from 'assets/icons/unchecked.svg';
import Error from 'components/shared/error/Error';
import s from './radio-list.module.scss';

const RadioList = ({ title, name, positions, handleChange, position_id, error }) => {

  return (
    <div className={s.section}>
      <p className={s.title}>{title}</p>
      {error && <Error title={error} marginBottom={0} />}
      {positions.map(el => {
        return (
          <div key={el.id} className={s.block}>
            <label htmlFor={el.name} className={s.label}>
              <input
                id={el.name}
                className={s.lnput}
                type='radio'
                name={name}
                value={el.id}
                checked={position_id === el.id}
                onChange={handleChange}
              />
              {position_id === el.id ? (
                <CheckedIcon className={s.icon} />
              ) : (
                <UncheckedIcon className={s.icon} />
              )}

              {el.name}
            </label>
          </div>
        );
      })}
    </div>
  )
}

export default RadioList