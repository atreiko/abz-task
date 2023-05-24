import { Container, Error, Loader } from 'components/shared';
import { ReactComponent as Logo } from 'assets/icons/logo.svg';
import s from './header.module.scss';
import { Navigation, UserInfo } from 'components/entities';

const Header = ({ currentUser, isLoading, error }) => {

  return (
    <header className={s.header}>
      <Container>
        <div className={s.inner}>

          <a className={s.logo} href='/'>
            <Logo />
          </a>
          {error ? (
            <Error title={error} marginBottom={0} marginLeft={20} />
          ) : (
            <div className={s.user}>
              <Navigation userRegistered={currentUser.id} />
              {isLoading ? (
                <div className={s.loaderBox}>
                  <Loader size={34} />
                </div>
              ) : (
                currentUser?.id && <UserInfo currentUser={currentUser} />
              )}
            </div>
          )}

        </div>
      </Container>
    </header>
  )
}

export default Header