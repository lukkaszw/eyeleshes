import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './InlineLink.module.scss';
import clsx from 'clsx';

const InlineLink = ({ children, classes, component, href, to, ...others }) => {

  const Component = href ? 'a' : Link;

  return ( 
    <Component
      className={clsx([styles.root, ...classes])}
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
};

InlineLink.defaultProps = {
  classes: [],
}
 
export default InlineLink;