import React, { useState } from 'react';
import { checkIfEmpty, checkRegex } from '../utils/utils';
import { createSurvey } from '../services/surveys';
import { getToken } from '../middlewares/cookies';

const Dashboard = () => {
    const [filterValues, setFilterValues] = useState({ dni: '', product: '', subProductA: '', maintenanceA: '', author: '', status: '' })
    const { searchText } = filterValues
    const [surveyData, setSurveyData] = useState({ dni: '', product: '', subProductA: '', subProductB: '', maintenanceA: '', maintenanceB: '', status: '' });

    return (
        <div>

            <input type="text" name="search-bar" id="search-bar" value={searchText} placeholder='Search' onChange={(e) => setFilterValues({ ...filterValues, searchText: e.target.value })} />
            <div>

            </div>
        </div>
    );
};

export default Dashboard;
