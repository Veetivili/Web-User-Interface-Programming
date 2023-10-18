import { render, screen, fireEvent } from '@testing-library/react';
import FuelInput from './fuelInput';

describe('FuelInput', () => {
  test('should render all input fields and a submit button', () => {
    render(<FuelInput />);
    expect(screen.getByPlaceholderText('Date')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Car total kilometers')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Refueled Liters')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Price Per Liter (€)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  test('should call handleSubmit when the form is submitted', () => {
    const handleSubmit = jest.fn();
    render(<FuelInput onSubmit={handleSubmit} />);
    fireEvent.submit(screen.getByRole('button', { name: 'Submit' }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('should update state when input fields are changed', () => {
    render(<FuelInput />);
    fireEvent.change(screen.getByPlaceholderText('Date'), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByPlaceholderText('Car total kilometers'), { target: { value: '1000' } });
    fireEvent.change(screen.getByPlaceholderText('Refueled Liters'), { target: { value: '50' } });
    fireEvent.change(screen.getByPlaceholderText('Price Per Liter (€)'), { target: { value: '1.5' } });
    expect(screen.getByPlaceholderText('Date')).toHaveValue('2022-01-01');
    expect(screen.getByPlaceholderText('Car total kilometers')).toHaveValue('1000');
    expect(screen.getByPlaceholderText('Refueled Liters')).toHaveValue('50');
    expect(screen.getByPlaceholderText('Price Per Liter (€)')).toHaveValue('1.5');
  });
});