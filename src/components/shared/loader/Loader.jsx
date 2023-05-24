import { ReactComponent as LoaderIcon } from 'assets/icons/loader.svg';
import s from './loader.module.scss';

const Loader = ({ height, size = 48, marginBottom = 0 }) => {
  return (
    <div className={s.block} style={{ height: height, marginBottom: marginBottom }}>
      <LoaderIcon className={s.loader} style={{ width: size, height: size }} />
    </div>
  )
}

export default Loader