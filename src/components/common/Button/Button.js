import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

const Button = (props) => {
  const {
    to,
    href,
    onClick,
    children,
    ariaLabel,
    target,
    disabled,
    isLoading,
    classes,
    color,
    ...others
  } = props;

  const EnhancedComponent = props.component || 'button';

  const enhancedStyles = [
    disabled && styles.disabled, 
    isLoading && styles.loading, 
    styles[color],
    ...classes
  ];

  if(EnhancedComponent !== 'button') {
    return ( 
      <EnhancedComponent
        className={clsx([
          styles.root, 
          ...enhancedStyles,
        ])}
        href={href}
        to={to}
        aria-label={ariaLabel}
        target={target}
      > 
        {children}
      </EnhancedComponent>
    );
  } else {
    return (
      <EnhancedComponent
        disabled={disabled}
        className={clsx([styles.root, ...enhancedStyles])}
        onClick={onClick}
        aria-label={ariaLabel}
        {...others}
      >
        {children}
      </EnhancedComponent>
    )
  }
}

Button.propTypes = {
  component: PropTypes.oneOf([Link, 'a', 'button']),
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  classes: PropTypes.array,
  color: PropTypes.oneOf(['primary', 'secondary']),
};

Button.defaultProps = {
  classes: [],
  color: 'primary',
};
 
export default Button;