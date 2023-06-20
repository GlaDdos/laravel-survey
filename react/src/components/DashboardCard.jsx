export default function DashboardCard({title, children, className = '', style =''}) {
    return (
        <div className={"bg-white shadow-md p-3 text-center flex flex-col animate-fade-in-down order-1 lg:order-2 " + className} style={style}>
            {title && <h3 className="text-2xl font-semibold">{title}</h3> }
            {children}
        </div>
    )
}
