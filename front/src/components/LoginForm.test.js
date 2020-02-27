import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import LoginForm from './LoginForm'

test('<LoginForm /> calls handleLogin with correct form inputs with onSubmit', () => {
  const handleLogin = jest.fn()

  const component = render(
    <LoginForm handleLogin={handleLogin} />
  )

  const form = component.container.querySelector('form')
  const usernameInput = component.container.querySelector('#username')
  const passwordInput = component.container.querySelector('#password')

  fireEvent.change(usernameInput, {
    target: { value: 'Rölli' }
  })
  fireEvent.change(passwordInput, {
    target: { value: 'Likaiset_varpaat' }
  })

  fireEvent.submit(form)

  const testi = {
    'username': 'Rölli',
    'password': 'Likaiset_varpaat',
  }

  expect(handleLogin.mock.calls[0][0]).toMatchObject(testi)
  expect(handleLogin.mock.calls).toHaveLength(1)
})