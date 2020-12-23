import styled, {css} from 'styled-components'

const successMessage = css`
    color: green
`

const failureMessage = css`
    color: red
`

const message = ({ success }) => {
    if (success)
        return successMessage
    else
        return failureMessage
}

export const Message = styled.span`
    ${message}
`