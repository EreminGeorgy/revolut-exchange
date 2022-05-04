import { ElementType, ReactNode, FC } from 'react'

type Props = {
	as?: ElementType
	className?: string
	children: ReactNode
}

const DangerousHtml: FC<Props> = ({ children, as = 'span', ...rest }) => {
  const Wrapper = as
  return (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: children,
      }}
      {...rest}
    />
  )
}
export default DangerousHtml
