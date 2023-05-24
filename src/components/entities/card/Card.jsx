import useWindowDimensions from 'services/hooks/useWindowDimensions';
import s from './card.module.scss';

const Card = ({ card }) => {
  const { width } = useWindowDimensions()
  const { position, name, photo, phone, email } = card

  const normalizeText = text => {
    if (width < 768) {
      return {
        tooltip: text?.length > 29,
        value: text?.length > 29 ? text.slice(0, 27) + '...' : text
      }
    }
    if (width < 1024) {
      return {
        tooltip: text?.length > 31,
        value: text?.length > 31 ? text.slice(0, 29) + '...' : text
      }
    }
    if (width < 2560) {
      return {
        tooltip: text?.length > 25,
        value: text?.length > 25 ? text.slice(0, 23) + '...' : text
      }
    }
    return {
      tooltip: text?.length > 34,
      value: text?.length > 34 ? text.slice(0, 32) + '...' : text
    }
  }

  return (
    <li className={s.card}>
      <img className={s.image} src={photo} alt={name} />
      {normalizeText(name).tooltip ? (
        <p className={s.name} card-tooltip={name}>{normalizeText(name).value}</p>
      ) : (
        <p className={s.name}>{name}</p>
      )}
      <div>
        <p className={s.info}>{position}</p>
        {normalizeText(email).tooltip ? (
          <a className={s.email} href={`mailto:${email}`} card-tooltip={email}>
            {normalizeText(email).value}
          </a>
        ) : (
          <a className={s.info} href={`mailto:${email}`}>
            {email}
          </a>
        )}
        <a className={s.info} href={`tel:${phone}`}>
          {phone}
        </a>
      </div>
    </li>
  )
}

export default Card