import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRefuelEvent, setPreviousKilometers } from '../reducers/fuelSlice';
import { db } from '../firebase';

function FuelInput() {
    const dispatch = useDispatch();
    const [date, setDate]  = useState('');
    const [kilometers, setKilometers] = useState('');
    const [refueledLiters, setRefueledLiters] = useState('');
    const [pricePerLiter, setPricePerLiter] = useState('');
    const [lastKilometers, setLastKilometers] = useState(null);

    // Fetch the last carKilometers value from Firebase when component mounts
    useEffect(() => {
      const fetchLastKilometers = async () => {
          const lastDocSnapshot = await db.collection('refuelEvents').orderBy('date', 'desc').limit(1).get();
          if (!lastDocSnapshot.empty) {
              const lastDoc = lastDocSnapshot.docs[0];
              setLastKilometers(lastDoc.data().carKilometers);
          }
      };
      fetchLastKilometers();
  }, []);


    const handleSubmit = (e) => {
        e.preventDefault();

        const kmFromPreviousRefuel = lastKilometers !== null ? parseFloat(kilometers) - lastKilometers : 0;

        const refuelEvent = {
          date,
          carKilometers: parseFloat(kilometers),
          kmFromPreviousRefuel,
          refueledLiters: parseFloat(refueledLiters),
          pricePerLiter: parseFloat(pricePerLiter),
          cost: (Math.round(parseFloat(refueledLiters) * parseFloat(pricePerLiter)).toFixed(2)),
          consumption: (Math.round((parseFloat(refueledLiters) / kmFromPreviousRefuel) * 100).toFixed(2))
      };


        dispatch(addRefuelEvent(refuelEvent));

        // Store current kilometer reading
        dispatch(setPreviousKilometers(parseFloat(kilometers)));

        // save to firebase

        db.collection('refuelEvents').add(refuelEvent).then(() => {
          console.log('Refuel event added to firebase');
        }
        ).catch((error) => {
          console.log('Error adding refuel event to firebase: ', error);
        });

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
          <input type='number' placeholder='Refueled Liters' value={refueledLiters} onChange={(e) => setRefueledLiters(e.target.value)} />
          <input type='number' placeholder='Price Per Liter (€)' value={pricePerLiter} onChange={(e) => setPricePerLiter(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>
    );

}

export default FuelInput;