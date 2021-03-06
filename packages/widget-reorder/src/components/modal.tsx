import * as React from 'react'
import styled from '@emotion/styled'

const StyledHeader = styled.h1`
  font-size: 1.25rem;
  line-height: 1.3;
  margin-bottom: 1rem;
`

const StyledModal = styled.div`
  position: absolute;
  width: 50%;
  padding: 1rem 1rem 1.25rem;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 0.25rem;
  box-shadow: 0 6px 12px 0 rgba(0,0,0,0.2);

  button {
    border: 1px solid #dfdfe3;
    color: rgb(23, 162, 184);
    padding: 0.75em 1.25em;
    background: #fff;
    border-radius: 6px;
  }

  button:hover {
    border: 1px solid rgb(23, 162, 184);
    background: rgb(23, 162, 184);
    color: #fff;
  }
`

const StyledOverlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(223, 223, 227, 0.8);
  z-index: 100;
`

export type Modified = 'none' | 'unset' | 'modified'

interface ModalContentArgs {
  collection: string;
  modified: Modified;
}

type ModalContent = Record<'title' | 'action', string>

const getModalContent = ({ modified, collection}: ModalContentArgs): ModalContent => {
  let title = ''
  let action = ''

  if (modified === 'unset') {
    title = `Order for collection '${collection}' hasn\'t been set yet`
    action = 'Start Ordering'
  }
  if (modified === 'modified') {
    title = `Collection '${collection}' have been changed`
    action = 'Apply changes'
  }
  return { title, action }
}

interface ModalProps extends ModalContentArgs {
  handleDisplayChange: () => void;
}

export const Modal: React.FC<ModalProps> = ({ collection, modified, handleDisplayChange }) => {
  const { title, action } = getModalContent({ modified, collection })
  return (
    <StyledOverlay>
      <StyledModal>
        <StyledHeader>{title}</StyledHeader>
        <button onClick={() => handleDisplayChange()}>{action}</button>
      </StyledModal>
    </StyledOverlay>
  )
}

const StyledEmptyMessage = styled.div`
  padding: 1rem;
  text-align: center;
`

export const EmptyMessage = ({ className, collection }) => (
  <StyledEmptyMessage className={className}>
    <StyledHeader>Collection &apos;{collection}&apos; is empty</StyledHeader>
    <p><a href={`#/collections/${collection}/new`} target="blank">Create new entries</a></p>
  </StyledEmptyMessage>
)