import React, { Component } from 'react'
import Portal from './Portal'
export default class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props
    return (
      <Portal>
        {on ? (
          <div className='wrapper'>
            <div className='card'>
              <button onClick={toggle} className='closeButton'>
                X
              </button>
              <div>{children}</div>
            </div>
          </div>
        ) : null}
      </Portal>
    )
  }
}
