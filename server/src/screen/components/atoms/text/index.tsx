import styles from './Text.module.scss';
import classNames from 'classnames/bind';
const cn = classNames.bind(styles);

export interface TextProps {
    isBlock?: boolean;
    fontWeight?: 300 | 400 | 500 | 600;
    children: string | JSX.Element | JSX.Element[];
}

export function Text(props: TextProps) {
    const {
        isBlock = false,
        fontWeight = 0,
    } = props;

    return (
        <span
            className={cn(
                'text',
                { isBlock },
                fontWeight !== 0 && `fw-${fontWeight / 100}`
            )}
        >
            {props.children}
        </span>
    )
}