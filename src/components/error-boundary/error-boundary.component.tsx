import React from 'react';
import './error-boundary.styles.scss';

type ErrorBoundaryProps = Record<string, any>;

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<
    ErrorBoundaryProps,
    ErrorBoundaryState
> {
    constructor(props: ErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    render(): React.ReactNode {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return (
                <div className="error-boundary">
                    <div
                        className="error-boundary__image"
                        style={{ backgroundImage: 'url(https://i.imgur.com/A040Lxr.png)' }}
                    />

                    <p className="error-boundary__text">This Page is Lost in Space</p>
                </div>
            );
        }

        return children;
    }
}

export default ErrorBoundary;