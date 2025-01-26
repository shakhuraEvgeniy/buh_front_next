'use client';
import { useEffect, useState } from 'react';
import { getReceivablesApi } from '../utils/api/receivables';
import { Receivables } from '../utils/definitions';
import TableReceivables from './tableDebt';

export default function ReceivablesPage() {
  const [receivables, setReceivables] = useState<Receivables[]>([]);
  useEffect(() => {
    getReceivables();
  }, []);

  const getReceivables = async () => {
    try {
      const data = await getReceivablesApi();
      setReceivables(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <TableReceivables data={receivables} />
    </div>
  );
}
