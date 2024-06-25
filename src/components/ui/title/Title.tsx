import { tittleFont } from '@/config/fonts'

interface TitleProps {
  title: string
  subtitle: string
  className: string
}

export const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`${className}`}>
      <h1 className={`${tittleFont.className} antialiased font-semibold my-1`}>{title}</h1>
      {subtitle && (
        <h3 className="text-base mb-6">{subtitle}</h3>
      )}
    </div>
  )
}
