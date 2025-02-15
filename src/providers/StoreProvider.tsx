'use client';

import { useRef } from 'react';
import { type StoreApi, type UseBoundStore } from 'zustand';

export default function StoreProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const storeRef = useRef<null | UseBoundStore<StoreApi<any>>>(null);
  
  return (
    <>
      {children}
    </>
  );
}