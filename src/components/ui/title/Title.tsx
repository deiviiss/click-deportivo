import { tittleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${tittleFont.className} antialiased font-semibold my-3`}>{title}</h1>
      {subtitle && (
        <h3 className="text-lg mb-3">{subtitle}</h3>
      )}
    </div>
  )
}
