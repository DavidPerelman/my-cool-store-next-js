import { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';

const PaymentSuccessPage = () => {
  const {
    query: { session_id },
  } = useRouter();

  const check = useCallback(async () => {
    const response = await fetch(`/api/checkout_sessions/${session_id}`, {});

    const data = await response.json();
    return data;
  }, [session_id]);

  useEffect(() => {
    check();
    console.log('fdf');
  }, [check]);

  return <div>Success</div>;
};

export default PaymentSuccessPage;
