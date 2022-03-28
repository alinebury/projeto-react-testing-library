import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Requisito 4 - Teste componente NotFound', () => {
  test('Teste se a página contém headind h2 com texto Page requested not found ', () => {
    render(<NotFound />);

    const title = screen.getByRole('heading',
      { name: 'Page requested not found Crying emoji', level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a página mostra a imagem da variável URL', () => {
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    render(<NotFound />);

    const image = screen.getAllByRole('img')[1];
    expect(image.src).toBe(URL);
  });
});
