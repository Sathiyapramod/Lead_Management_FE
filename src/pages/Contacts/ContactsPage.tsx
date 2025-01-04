import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Table, { BaseTable } from '../../components/custom/Table/Table';
import Heading from '../../components/Heading';
import SearchBar from '../../components/SearchBar';
import API from '../../services/api';
import { ContactList } from '../../utils/constants';
import { title_headings } from '../../utils/headings';
import { ContactsList } from './Contacts.types';

interface Contacts extends BaseTable {
  contacts: ContactsList[];
}

function Contacts(): React.ReactNode {
  const navigate = useNavigate();
  const [contactList, setContactsList] = useState<Contacts>({
    count: 0,
    active: 0,
    pending: 0,
    contacts: [],
  });

  const [offset, setOffset] = useState<number>(0);

  const getList = async () => {
    try {
      const { data, status } = await API.getContacts({
        limit: '10',
        offset: String(offset),
      });
      if (status !== 200) {
        toast.error('Error while fetching the Leads');
      } else {
        setContactsList(data);
      }
    } catch (err) {
      toast.error('Error');
    }
  };

  useEffect(() => {
    getList();
  }, [offset]);

  const onClick = () => navigate('/contacts/create');

  return (
    <div className="p-[55px]">
      <div className="flex justify-between items-start">
        <Card
          title={title_headings.CONTACTS}
          count={contactList?.count ?? 0}
          active={contactList?.active ?? 0}
          pending={contactList?.pending ?? 0}
          activeTag="Active"
          pendingTag="Pending"
        />
        <div className="text-right">
          <SearchBar onChange={() => {}} placeholder={'Search Contacts'} />
          <Button
            content="+ Create Contact"
            theme="dark"
            classname="rounded-lg mt-[15px]"
            onClick={onClick}
          />
        </div>
      </div>
      <Heading content={title_headings.CONTACTS} classname="my-[40px]" />
      {contactList && (
        <Table
          columns={ContactList}
          data={contactList}
          setOffset={setOffset}
          name={title_headings.CONTACTS}
        />
      )}
    </div>
  );
}

export default Contacts;
