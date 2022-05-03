import { Label, Icon } from 'semantic-ui-react'

import DangerousHtml from '../DangerousHtml'
import { getCurrencySign } from '../../util/getCurrencySign'

const Header: React.FC = () => {
  return (
    <div>
      <Label>    
        <Icon name='chart line'/>
        <DangerousHtml as="span">
          {getCurrencySign('EUR')}
        </DangerousHtml>
      </Label>
    </div>
  )
}

export default Header
