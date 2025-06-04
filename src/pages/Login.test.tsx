import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import api from '../services/api';

jest.mock('../services/api');

describe('Login Page', () => {
  beforeEach(() => {
    (api.post as jest.Mock).mockResolvedValue({ data: { token: 'test-token' } });
  });

  test('submits form and navigates on mock credentials', async () => {
    const navigateMock = jest.fn();
    jest.spyOn(require('react-router-dom'), 'useNavigate').mockImplementation(() => navigateMock);

    render(
      <MemoryRouter initialEntries={['/login']}>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/E-mail/i), { target: { value: 'test@everyfin.com' } });
    fireEvent.change(screen.getByLabelText(/Senha/i), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/dashboard');
    });
  });
});
