import { Link } from 'react-scroll';
import s from './navigation.module.scss';

const Navigation = ({ userRegistered }) => {
  // console.log(!!userRegistered);
  return (
    <nav className={s.nav}>
      <Link
        className={s.link}
        to='users'
        spy={true}
        smooth={true}
        offset={-70}
        duration={500}
        href='#users'
      >
        Users
      </Link>
      {!userRegistered && (
        <Link
          className={s.link}
          to='sign-up'
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          href='#sign-up'
        >
          Sign up
        </Link>
      )}
    </nav>
  )
}

export default Navigation