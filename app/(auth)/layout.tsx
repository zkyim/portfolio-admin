const LayoutRoot = ({
    children,
}: {
    children: React.ReactNode,
}) => {
    return (
        <div className="w-full h-full">
            <div className="flex justify-center items-center">
                {children}
            </div>
        </div>
    )
}

export default LayoutRoot;