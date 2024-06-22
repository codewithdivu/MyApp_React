import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
//
import { NavItemRoot, NavItemSub } from './NavItem';
import { PaperStyle } from './style';
import { getActive } from '..';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

NavListRoot.propTypes = {
  list: PropTypes.shape({
    children: PropTypes.array,
    roles: PropTypes.array,
    path: PropTypes.string,
  }),
};

export function NavListRoot({ list }) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();
  const { user } = useAuth();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const hasChildren = list.children;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (hasChildren) {
    return list?.roles?.includes(user?.designation) ? (
      <>
        <NavItemRoot
          open={open}
          item={list}
          active={active}
          ref={menuRef}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) => (
            <NavListSub key={item.title} list={item} />
          ))}
        </PaperStyle>
      </>
    ) : (
      ''
    );
  }

  return list?.roles?.includes(user?.designation) ? <NavItemRoot item={list} active={active} /> : '';
}

// ----------------------------------------------------------------------

NavListSub.propTypes = {
  list: PropTypes.shape({
    children: PropTypes.array,
    path: PropTypes.string,
    roles: PropTypes.array,
  }),
};

function NavListSub({ list }) {
  const menuRef = useRef(null);

  const { pathname } = useLocation();
  const { user } = useAuth();

  const active = getActive(list.path, pathname);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const hasChildren = list.children;

  if (hasChildren) {
    return list?.roles?.includes(user?.designation) ? (
      <>
        <NavItemSub
          ref={menuRef}
          open={open}
          item={list}
          active={active}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
        />

        <PaperStyle
          open={open}
          anchorEl={menuRef.current}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          PaperProps={{
            onMouseEnter: handleOpen,
            onMouseLeave: handleClose,
          }}
        >
          {(list.children || []).map((item) =>
            item?.roles?.includes(user?.designation) ? <NavListSub key={item.title} list={item} /> : ''
          )}
        </PaperStyle>
      </>
    ) : (
      ''
    );
  }

  return list?.roles?.includes(user?.designation) ? <NavItemSub item={list} active={active} /> : '';
}
