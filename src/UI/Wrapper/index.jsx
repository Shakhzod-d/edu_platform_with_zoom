export default function Wrapper({ size, className, children, ...props }) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-20 ${
        size === 'large'
          ? 'px-20 py-9'
          : size === 'medium'
          ? 'py-10 px-12'
          : size === 'small'
          ? 'px-6 py-5'
          : 'px-10 py-7'
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
