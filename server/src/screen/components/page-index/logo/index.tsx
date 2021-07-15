import styles from './Logo.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

export interface LogoProps {
    position: 'bottom-left';
}

export function Logo(props: LogoProps) {
    return (
        <img
            className={cn('logo', props.position)}
            src="/assets/logo.png"
        />
    )
}