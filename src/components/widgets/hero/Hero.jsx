import { Link } from 'react-scroll';
import { Container } from 'components/shared';
import s from './hero.module.scss';

const Hero = ({ marginBottom = 140 }) => {
  return (
    <section className={s.section} style={{ marginBottom: marginBottom }}>
      <Container>
        <div className={s.block}>
          <h1 className={s.title}>Test assignment for front-end developer</h1>
          <p className={s.description}>
            What defines a good front-end developer is one that has skilled knowledge of HTML, CSS,
            JS with a vast understanding of User design thinking as they'll be building web
            interfaces with accessibility in mind. They should also be excited to learn, as the
            world of Front-End Development keeps evolving.
          </p>
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
        </div>
      </Container>
    </section>
  )
}

export default Hero