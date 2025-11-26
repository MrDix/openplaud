type IconProps = React.HTMLAttributes<SVGElement>;

export const Logo = ({ className, ...props }: IconProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            {...props}
            fill="none"
            className={className}
            aria-label="OpenPlaud Logo"
            aria-hidden="true"
        >
            <path
                stroke="var(--foreground)"
                strokeWidth="2"
                d="M7 1h10a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H7a6 6 0 0 1-6-6V7a6 6 0 0 1 6-6Z"
            />
            <path
                fill="var(--primary)"
                d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            />
        </svg>
    );
};
