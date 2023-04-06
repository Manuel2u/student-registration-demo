export interface GridLayoutComponentPropType {
    children: any;
    columns?: number;
    gap?: number;
    className?: string;
}

function GridLayoutComponent({ children, columns = 1, gap = 2, className }: GridLayoutComponentPropType) {
    return (
        <div className={`grid grid-cols-${columns} gap-${gap} ${className || ""} h-full`}>
            {children}
        </div>
    )
}

export default GridLayoutComponent
