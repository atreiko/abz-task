import { Container } from 'components/shared';
import registerSuccess1x from 'assets/images/register-success-1x.png';
import registerSuccess2x from 'assets/images/register-success-2x.png';
import s from './success.module.scss';

const Success = () => {
  return (
    <section className={s.section}>
      <Container>
        <h2 className={s.title}>User successfully registered</h2>
        <img
          className={s.image}
          src={registerSuccess1x}
          srcSet={`${registerSuccess1x} 1x, ${registerSuccess2x} 2x`}
          alt='User successfully registered'
          width={290}
        />
      </Container>
    </section>
  );
};

export default Success;