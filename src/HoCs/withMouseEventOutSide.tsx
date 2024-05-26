import { useEffect } from 'react';

type withMouseEventOutSideProps = {
    parentNode: HTMLElement | null;
    executeFunction: () => void;
    isKeyEscape?: boolean;
    isMouseOverCheck?: boolean;
};

const withMouseEventOutSide = ({
    parentNode,
    executeFunction,
    isKeyEscape,
    isMouseOverCheck,
}: withMouseEventOutSideProps) => {
    return <T,>(WrapperComponent: React.ComponentType<T> | null) => {
        return (props: T): JSX.Element | null => {
            if (!parentNode || !WrapperComponent) {
                return null;
            }

            const handleEscapeWithMouse = (e: MouseEvent): void => {
                if (!parentNode!.contains(e.target as Node)) {
                    executeFunction();
                }
            };

            const handleEscapeResize: EventListenerOrEventListenerObject = (e) => {
                executeFunction();
            };

            const handleEscapeKeyEsc = (e: KeyboardEvent): void => {
                if ((e.key as string) === 'Escape') executeFunction();
            };

            useEffect(() => {
                window.addEventListener('click', handleEscapeWithMouse);
                window.addEventListener('resize', handleEscapeResize);

                if (isMouseOverCheck) window.addEventListener('mouseover', handleEscapeWithMouse);

                if (isKeyEscape) window.addEventListener('keydown', handleEscapeKeyEsc);

                return () => {
                    window.removeEventListener('click', handleEscapeWithMouse);

                    if (isMouseOverCheck!) window.removeEventListener('mouseover', handleEscapeWithMouse);
                    if (isKeyEscape) window.removeEventListener('keydown', handleEscapeKeyEsc);
                };
            }, []);

            return <WrapperComponent {...(props as any)} />;
        };
    };
};

export default withMouseEventOutSide;
