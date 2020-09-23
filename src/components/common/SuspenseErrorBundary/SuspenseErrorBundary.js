import React, { Component } from 'react';
import LoaderIndicator from '../LoaderIndicator';
import Error from './components/Error';

class SuspenseErrorBoundary extends Component {
  state = { 
    hasError: false 
  };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo);
  }

  render() {
    return (
      <React.Suspense fallback={<LoaderIndicator/>}>
        {
          this.state.hasError ?
          <Error>Błąd! Coś poszło nie tak!</Error>
          :
          <>
            {this.props.children}
          </>
        }
      </React.Suspense>
  
    )
  }
}

export default SuspenseErrorBoundary;