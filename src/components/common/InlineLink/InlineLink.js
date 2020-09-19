import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './InlineLink.module.scss';
import clsx from 'clsx';

const InlineLink = ({ children, classes, inheritColor, component, href, to, ...others }) => {

  const Component = href ? 'a' : Link;

  return ( 
    <Component
      className={clsx([styles.root, ...classes, inheritColor && styles.inherit])}
      href={href}
      to={to}
      {...others}
    >
      {children}
    </Component>
  );
}

InlineLink.propTypes = {
  href: PropTypes.string,
  to: PropTypes.string,
  component: PropTypes.oneOf([Link, 'a']),
  classes: PropTypes.array,
  inheritColor: PropTypes.bool,
};

InlineLink.defaultProps = {
  classes: [],
}
 
export default InlineLink;