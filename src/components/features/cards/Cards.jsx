import { Card } from 'components/entities';
import { Button, Container, Error, Loader } from 'components/shared';
import useWindowDimensions from 'services/hooks/useWindowDimensions';
import s from './cards.module.scss';

const Cards = ({
  cards,
  title,
  isLoading,
  error,
  marginBottom = 140,
  nextPage,
  prevPage,
  nextUrl,
  prevUrl
}) => {
  const { width } = useWindowDimensions()
  const sortedCards = [...cards]
    .sort((a, b) => b.registration_timestamp - a.registration_timestamp)

  const loaderHeight = width < 768 ? 1623 : width < 1080 ? 794 : 537;

  return (
    <section id='users' style={{ marginBottom: marginBottom }}>
      <Container>
        <div className={s.block}>
          <h2 className={s.title}>{title}</h2>
          {error && <Error title={error} />}
          {isLoading ? (
            <Loader height={loaderHeight} size={150} marginBottom={50} />
          ) : (
            <ul className={s.list}>
              {sortedCards.map(card => (
                <Card key={card.id} card={card} />
              ))}
            </ul>
          )}

          <div className={s.btnBlock}>
            {prevUrl && <Button title='Show prev' width={120} type='button' onClick={prevPage} />}
            {nextUrl && <Button title='Show next' width={120} type='button' onClick={nextPage} />}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Cards