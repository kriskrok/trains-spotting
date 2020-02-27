import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Trains from './Trains'

describe('<Train />' , () => {
  let component

  beforeEach(() => {
    component = render(
      <Trains />
    )
  })

  test('table is displayed', () => {
    expect(component).toBeDefined()

    const table = component.container.querySelector('table')
    expect(component).toBeDefined()

    const tableHead = component.container.querySelector('.thead-dark')
    expect(table).toContainElement(table)

    expect(component.container).toHaveTextContent('Coordinates')
    expect(component.container).toHaveTextContent('Train data')
  })
})