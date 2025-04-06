import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import Card from "../../components/Card";
import Table from "../../components/custom/Table/Table";
import { BaseTable } from "../../components/custom/Table/Tables.types";
import Heading from "../../components/Heading";
import SearchBar from "../../components/SearchBar";
import API from "../../services/api";
import { MgrColumns } from "../../config/constants";
import { title_headings } from "../../config/headings";
import { ManagersList } from "./Manager.types";

interface Managers extends BaseTable {
  managers: ManagersList[];
}

function Manager(): React.ReactNode {
  const [searchName, setName] = useState<string>("");
  const [mgrs, setMgrs] = useState<Managers>({
    count: 0,
    active: 0,
    pending: 0,
    completed: 0,
    managers: [],
  });
  const [offset, setOffset] = useState<number>(0);

  const getList = async () => {
    try {
      const { data, status } = await API.getManagers({
        limit: "10",
        offset: String(offset),
        searchName,
      });
      if (status !== 200) {
        toast.error("Error while fetching the Leads");
      } else {
        setMgrs(data);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error");
    }
  };

  useEffect(() => {
    getList();
  }, [offset, setName]);

  return (
    <div className="p-[55px]">
      <div className="flex justify-between items-start">
        <Card
          title={title_headings.KAM}
          count={mgrs?.count ?? 0}
          active={mgrs?.active ?? 0}
          pending={mgrs?.pending ?? 0}
          activeTag="Active"
          pendingTag="Pending"
        />
        <div className="text-right">
          <SearchBar
            onChange={(e) => setName(e.target.value)}
            placeholder={"Search Managers"}
          />
        </div>
      </div>
      <Heading content={title_headings.KAM} classname="my-[40px]" />
      <Table
        columns={MgrColumns}
        data={mgrs}
        setOffset={setOffset}
        name={title_headings.KAM}
      />
    </div>
  );
}

export default Manager;
