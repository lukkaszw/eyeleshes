import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.scss';


const Button = (props) => {
  const {
    to,
    href,
    onClick,
    children,
    ariaLabel,
    variant,
    target,
    disabled,
    isLoading,
    classes,
    color,
    size,
    component,
    icon,
    ...others
  } = props;

  const EnhancedComponent = component || 'button';

  const enhancedStyles = [
    disabled && styles.disabled, 
    isLoading && styles.loading, 
    styles[color],
    styles[size],
    variant && styles[variant],
    ...classes
  ];

  const content = icon ? (
    <FontAwesomeIcon icon={icon}/>
  )
  :
  children;

  if(EnhancedComponent !== 'button') {
    return ( 
      <EnhancedComponent
        className={clsx([
          icon ? styles.iconRoot : styles.root, 
          ...enhancedStyles,
        ])}
        href={href}
        to={to}
        aria-label={ariaLabel}
        target={target}
      > 
        {content}
      </EnhancedComponent>
    );
  } else {
    return (
      <EnhancedComponent
        disabled={disabled}
        className={clsx([icon ? styles.iconRoot : styles.root, ...enhancedStyles])}
        onClick={onClick}
        aria-label={ariaLabel}
        {...others}
      >
        {content}
      </EnhancedComponent>
    )
  }
}

Button.propTypes = {
  component: PropTypes.oneOf([Link, 'a', 'button']),
  icon: PropTypes.object,
  to: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  ariaLabel: PropTypes.string,
  target: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  classes: PropTypes.array,
  color: PropTypes.oneOf(['primary', 'secondary', 'tertiary']),
  size: PropTypes.string,
  variant: PropTypes.string,
};

Button.defaultProps = {
  classes: [],
  color: 'primary',
};
 
export default Button;