import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Table from '../../components/custom/Table/Table';
import Heading from '../../components/Heading';
import SearchBar from '../../components/SearchBar';
import { useAppDispatch, useTypedSelector } from '../../store';
import { fetchLeadLists } from '../../store/reducers/leads';
import { fetchLeads } from '../../store/reducers/performance';
import { LeadColumns } from '../../utils/constants';
import { title_headings } from '../../utils/headings';

function Leads(): React.ReactNode {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchName, setName] = useState<string>('');
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    dispatch(
      fetchLeadLists({ offset: String(offset), limit: '10', searchName }),
    );
    dispatch(fetchLeads());
  }, [offset, searchName]);

  const { leadList } = useTypedSelector((state) => state.leads);
  const { analytics } = useTypedSelector((state) => state);

  const onClick = () => {
    if (window.localStorage.getItem('role') === 'KAM')
      navigate('/leads/create');
    else return;
  };

  return (
    <div className="p-[55px]">
      <div className="flex justify-between items-start">
        <Card
          title={title_headings.LEADS}
          count={analytics.leadList?.count ?? 0}
          active={analytics.leadList?.active ?? 0}
          pending={analytics.leadList?.pending ?? 0}
          activeTag="Active"
          pendingTag="Pending"
        />
        <div className="text-right">
          <SearchBar
            onChange={(e) => setName(e.target.value)}
            placeholder={'Search Leads'}
          />
          <Button
            content="+ Create Lead"
            theme="dark"
            classname="rounded-lg mt-[15px]"
            onClick={onClick}
          />
        </div>
      </div>
      <Heading content={title_headings.LEADS} classname="my-[40px]" />
      <Table
        columns={LeadColumns}
        data={leadList}
        setOffset={setOffset}
        name={title_headings.LEADS}
      />
    </div>
  );
}

export default Leads;
