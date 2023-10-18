import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addRefuelEvent } from '../reducers/fuelSlice';

function FuelInput() {
    const dispatch = useDispatch();
    const [date, setDate]  = useState('');
    const [kilometers, setKilometers] = useState('');
    //const [kmFromPreviousRefuel, setKmFromPreviousRefuel] = useState('');
    const [refueledLiters, setRefueledLiters] = useState('');
    const [pricePerLiter, setPricePerLiter] = useState('');

    // Store previous kilometer reading
    const [previousKilometers, setPreviousKilometers] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Calculate kmFromPreviousRefuel
        const kmFromPreviousRefuel = previousKilometers !== null ? kilometers - previousKilometers : 0;


        dispatch(addRefuelEvent({
            date,
            carKilometers: parseFloat(kilometers),
            kmFromPreviousRefuel,
            refueledLiters: parseFloat(refueledLiters),
            pricePerLiter: parseFloat(pricePerLiter),
            cost: (Math.round(parseFloat(refueledLiters) * parseFloat(pricePerLiter)).toFixed(2)),
            consumption: (Math.round((parseFloat(refueledLiters) / kmFromPreviousRefuel) * 100).toFixed(2))
        }));

        // Store current kilometer reading
        setPreviousKilometers(kilometers);

        setDate('');
        setKilometers('');
        setRefueledLiters('');
        setPricePerLiter('');
    }
    
    return(
    <div className="container">
        <form className='input-form' onSubmit={handleSubmit}>
          <input type='date' placeholder='Date' value={date} onChange={(e) => setDate(e.target.value)} />
          <input type='number' placeholder='Car total kilometers' value={kilometers} onChange={(e) => setKilometers(e.target.value)} />
          {/* <input type='number' placeholder='Kilometers driven since previous refuel' value={kmFromPreviousRefuel} onChange={(e) => setKmFromPreviousRefuel(e.target.value)} /> */}
          <input type='number' placeholder='Refueled Liters' value={refueledLiters} onChange={(e) => setRefueledLiters(e.target.value)} />
          <input type='number' placeholder='Price Per Liter (€)' value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );

}

export default FuelInput;