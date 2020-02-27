import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import SignUpForm from './SignUpForm'

test('<SignUpForm /> calls addUser with correct form inputs with onSubmit', () => {
  const addUser = jest.fn()

  const component = render(
    <SignUpForm createUser={addUser} />
  )

  const form = component.container.querySelector('form')
  const usernameInput = component.container.querySelector('#username')
  const nameInput = component.container.querySelector('#name')
  const emailInput = component.container.querySelector('#email')
  const passwordInput = component.container.querySelector('#password')

  fireEvent.change(usernameInput, {
    target: { value: 'Rölli' }
  })
  fireEvent.change(nameInput, {
    target: { value: 'Röllimetsän Rölli' }
  })
  fireEvent.change(emailInput, {
    target: { value: 'rolli@kaukametsa.fi' }
  })
  fireEvent.change(passwordInput, {
    target: { value: 'Likaiset_varpaat' }
  })

  fireEvent.submit(form)

  const testi = {
    'username': 'Rölli',
    'name': 'Röllimetsän Rölli',
    'email': 'rolli@kaukametsa.fi',
    'password': 'Likaiset_varpaat',
  }

  expect(addUser.mock.calls[0][0]).toMatchObject(testi)
  expect(addUser.mock.calls).toHaveLength(1)
})
