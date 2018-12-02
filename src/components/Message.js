// @flow

import * as React from 'react'
import styled from 'styled-components'

const StyledDiv = styled.div`
padding: .5rem;

background-color: #fff;

border-bottom: 1px solid #e6ecf0;
`

type MessageProps = {
  children: React.Node
}

export default React.memo<MessageProps>(({ children }) => <StyledDiv>{children}</StyledDiv>)
