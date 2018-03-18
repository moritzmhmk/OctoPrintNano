import React, { Component } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class ListView extends Component {
  constructor (props) {
    super(props)
    this.state = {active: 0}
    this.handleUp = this.handleUp.bind(this)
    this.handleDown = this.handleDown.bind(this)
  }

  handleUp () {
    this.setState(prevState => ({
      active: Math.max(prevState.active - 1, 0)
    }))
  }

  handleDown () {
    this.setState(prevState => ({
      active: Math.min(prevState.active + 1, this.props.items.length - 1)
    }))
  }

  render () {
    let items = []
    for (let i = this.state.active - 1; i <= this.state.active + 1; i++) {
      items.push({index: i, value: this.props.items[i]})
    }
    return <div className='listview'>
      <Button onClick={this.handleUp} dir='up' />
      <Button onClick={this.handleDown} dir='down' />
      <TransitionGroup component='ul' appear>
        {items.map(({index, value}) => {
          const active = index === this.state.active
          const className = active ? 'active' : ''
          const onClick = active ? () => this.props.onSelect(value) : () => {}
          return <FadeTransition key={index}>
            <li className={className} onClick={onClick}>{value}</li>
          </FadeTransition>
        })}
      </TransitionGroup>
    </div>
  }
}

export default ListView

const Button = ({dir, onClick}) => {
  const path = {up: 'M 5 25 m 0 6 l 20 -12 l 20 12', down: 'M 5 25 m 0 -6 l 20 12 l 20 -12'}
  return <svg
    onClick={onClick}
    viewBox='0 0 50 50'
    className={`btn ${dir}`}>
    <path d={path[dir]} />
  </svg>
}

const FadeTransition = props => <CSSTransition
  {...props}
  classNames='fade'
  timeout={{ enter: 1200, exit: 1200 }}
/>
