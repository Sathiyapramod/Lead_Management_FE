import React, { useEffect,useState } from 'react';

import CustomTable from '../../components/custom/Table/CustomTable';
import { useAppDispatch, useTypedSelector } from '../../store';
import { fetchReport } from '../../store/reducers/performance';
import { PERF_HEADINGS } from '../../utils/constants';
import { PageReport } from './HomePage.types';

function Dashboard(): React.ReactNode {
  const dispatch = useAppDispatch();

  const [currTab, setCurrTab] = useState<keyof PageReport>('3Days');

  useEffect(() => {
    dispatch(fetchReport());
  }, []);

  const { report } = useTypedSelector((state) => state.analytics);

  const handleTab = (value: keyof PageReport) => setCurrTab(value);

  const COLOR_CODES: Record<string, string> = {
    '3Days': 'text-darkgreen',
    '7Days': 'text-blue-500',
    '14Days': 'text-red-400',
  };

  return (
    <div className="rounded-lg bg-white shadow-sm w-full max-lg:w-fit">
      <ol className="flex space-x-2">
        {Object.entries(PERF_HEADINGS).map(([key, value]) => (
          <li
            key={key}
            onClick={() => handleTab(value as keyof PageReport)}
            className={`px-2 py-1 cursor-pointer ${COLOR_CODES[value]}`}
          >
            {key}
          </li>
        ))}
      </ol>
      <CustomTable columns={report[currTab]} />
    </div>
  );
}

export default Dashboard;
