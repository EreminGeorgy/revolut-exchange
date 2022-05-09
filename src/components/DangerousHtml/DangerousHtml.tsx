import { ElementType, ReactNode, FC } from 'react'

type Props = {
	type?: ElementType
	className?: string
	children: ReactNode
}

const DangerousHtml: FC<Props> = ({ children, type = 'span', ...rest }) => {
  const Wrapper = type
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
