import { useDispatch, useSelector } from 'react-redux';
import { removeFuelEvent } from '../reducers/fuelSlice';

function FuelHistory() {
    const fuelHistory = useSelector(state => state.fuel);
    const dispatch = useDispatch();

    // Calculate totals and averages
    const totalRefueledLiters = fuelHistory.reduce((acc, entry) => acc + parseFloat(entry.refueledLiters), 0);
    const totalCost = fuelHistory.reduce((acc, entry) => acc + parseFloat(entry.cost), 0);
    const totalKilometers = fuelHistory.length > 0 ? parseFloat(fuelHistory[fuelHistory.length - 1].carKilometers) - parseFloat(fuelHistory[0].carKilometers) : 0;
    const averagePricePerLiter = ((fuelHistory.reduce((acc, entry) => acc + parseFloat(entry.pricePerLiter), 0) / fuelHistory.length) || 0).toFixed(2);
    const averageConsumption = totalKilometers !== 0 ? ((totalRefueledLiters / totalKilometers) * 100).toFixed(2) : 0;
    const averageCost = (Math.round((totalCost / fuelHistory.length)).toFixed(2));

    const handleRemoveEntry = (index) => {
        dispatch(removeFuelEvent(index));
    };

    return(
        <div className="container">
            {/* Refuel History Table */}
            <table className="fuel-table">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Car Kilometers</th>
                        <th>Kilometers from Previous Refuel</th>
                        <th>Refueled Liters</th>
                        <th>Price per Liter</th>
                        <th>Cost</th>
                        <th></th> {/* Remove button column */}
                    </tr>
                </thead>
                <tbody>
                    {fuelHistory.map((entry, index) => (
                        <tr key={index}>
                            <td>{entry.date}</td>
                            <td>{entry.carKilometers}</td>
                            <td>{entry.kmFromPreviousRefuel}</td>
                            <td>{entry.refueledLiters}</td>
                            <td>{entry.pricePerLiter}</td>
                            <td>{entry.cost}</td>
                            <td><button onClick={() => handleRemoveEntry(index)}>Remove</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Summary Table */}
            <table className="fuel-table">
                <thead>
                    <tr>
                        <th>Total Kilometers</th>
                        <th>Total Refueled Liters</th>
                        <th>Total Cost</th>
                        <th>Average Price per Liter</th>
                        <th>Average Consumption L/100km</th>
                        <th>Average Price €/Refuel</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalKilometers} km</td>
                        <td>{totalRefueledLiters} L</td>
                        <td>{totalCost} €</td>
                        <td>{averagePricePerLiter} ~€/L</td>
                        <td>{averageConsumption} l/100km</td>
                        <td>{averageCost} €/Refuel</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default FuelHistory;