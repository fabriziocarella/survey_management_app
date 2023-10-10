import React, { useState } from 'react';
import { checkIfEmpty, checkRegex } from '../utils/utils';
import { createSurvey } from '../services/surveys';
import { getToken } from '../middlewares/cookies';

const Dashboard = () => {
    const [surveyData, setSurveyData] = useState({ dni: '', product: '', subProductA: '', subProductB: '', maintenanceA: '', maintenanceB: '', status: '' });
    const { dni, product, subProductA, subProductB, maintenanceA, maintenanceB, status } = surveyData
    const [surveyOptions, setSurveyOptions] = useState({
        product: ['Luz', 'Gas', 'Dual'],
        subProductA: {
            Luz: ['Tarifa Plana', 'Tarifa por uso'],
            Gas: ['Plana', 'Total'],
        },
        maintenance: ['Sí', 'No'],
        status: ['Vendido', 'En proceso', 'No vendido', 'No válido']
    })
    const handleSurveyChange = (e) => {
        const { name, value } = e.target;
        if (name === 'product') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value, subProductA: '', subProductB: '', maintenanceA: '', maintenanceB: '' }))
        } else if (name === 'subProductA') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value, subProductB: '', maintenanceA: '', maintenanceB: '' }))
        } else if (name === 'subProductB') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value, maintenanceA: '', maintenanceB: '' }))
        } else if (name === 'maintenanceA') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value, maintenanceB: '' }))
        } else if (name === 'maintenanceB') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value }))
        } else if (name === 'status') {
            setSurveyData((prevData) => ({ ...prevData, [name]: value }))
        }
    };

    const handleSurveySubmit = async (e) => {
        e.preventDefault();
        const { subProductB, maintenanceB, ...data } = surveyData
        console.log('data: ', data);
        if (!checkIfEmpty((product === 'Luz' || product === 'Gas') ? data : surveyData)) {
            console.error('Fill all the fields');
            return;
        } else {
            if (!checkRegex(dni, 'dni')) {
                console.error('Invalid DNI format');
                return;
            }
            const admin = getToken('admin')
            const newSurvey = await createSurvey(surveyData, admin)
            console.log('newSurvey: ', newSurvey);
            if (newSurvey.status === 200) {
                window.location.reload()
            }
        }
    }

    return (
        <form onSubmit={handleSurveySubmit}>
            <div>
                <label>DNI:</label>
                <input type="text" value={dni} onChange={(e) => setSurveyData({ ...surveyData, dni: e.target.value })} required />
            </div>
            <div>
                <label>Product:</label>
                <select value={product} name='product' onChange={(e) => handleSurveyChange(e)} required>
                    <option value="">Select a product</option>
                    {surveyOptions.product.map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                </select>
            </div>
            <div>
                <label>Subproducto {product === 'Dual' ? 'Luz' : ''}:</label>
                <select value={subProductA} name='subProductA' onChange={(e) => handleSurveyChange(e)} required>
                    <option value="">Select a sub-product</option>
                    {(product === 'Luz' || product === 'Gas') && surveyOptions.subProductA[product].map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                    {(product === 'Dual' && surveyOptions.subProductA['Luz'].map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>))}
                </select>
            </div>
            {product === 'Dual' && (
                <div>
                    <label>Subproducto Gas:</label>
                    <select value={subProductB} name='subProductB' onChange={(e) => handleSurveyChange(e)} required>
                        <option value="">Select a sub-product</option>
                        {surveyOptions.subProductA['Gas'].map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                    </select>
                </div>
            )}
            {product && (
                <div>
                    <label>Mantenimiento {product === 'Dual' ? 'Luz' : ''}:</label>
                    <select value={maintenanceA} name='maintenanceA' onChange={(e) => handleSurveyChange(e)} required>
                        <option value="">Mantenimiento</option>
                        {surveyOptions.maintenance.map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                    </select>
                </div>
            )}
            {product === 'Dual' &&
                <div>
                    <label>Mantenimiento Gas:</label>
                    <select value={maintenanceB} name='maintenanceB' onChange={(e) => handleSurveyChange(e)} required>
                        <option value="">Mantenimiento</option>
                        {surveyOptions.maintenance.map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                    </select>
                </div>
            }
            <div>
                <label>Estado:</label>
                <select value={status} name='status' onChange={(e) => handleSurveyChange(e)} required>
                    <option value="">Estado</option>
                    {surveyOptions.status.map((p, i) => <option value={p} key={`${p}-${i}`}>{p}</option>)}
                </select>
            </div>
            <button type="submit">Create Survey</button>
        </form>
    );
};

export default Dashboard;
