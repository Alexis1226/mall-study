import { Link, useLocation } from 'react-router-dom';
import '../fonts/DAYLIFE-DAY.ttf';

const Gnb = () => {
  const { pathname } = useLocation();
  return (
    <nav className="gnb">
      <div id="mall">
        <Link to="/">MALL</Link>
      </div>
      <ul>
        <li>
          <Link to="/" className={pathname === '/' ? 'afterEffect' : ''}>
            홈
          </Link>
        </li>
        <li>
          <Link to="/products" className={pathname === '/products' ? 'afterEffect' : ''}>
            상품목록
          </Link>
        </li>
        <li>
          <Link to="/cart" className={pathname === '/cart' ? 'afterEffect' : ''}>
            장바구니
          </Link>
        </li>
        <li>
          <Link to="admin" className={pathname === '/admin' ? 'afterEffect' : ''}>
            어드민
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Gnb;
