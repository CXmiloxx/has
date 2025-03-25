import React from 'react';
import Layout from '@layout/Layout';
import CardDynamic from '@/CardDynamic';
import PrincipalImage from '@/PrincipalImage';
import Buzon from '@/Buzon';

export default function HomePage() {
  return (
    <Layout>
      <CardDynamic/>
      <PrincipalImage/>
      <Buzon/>
    </Layout>
  );
}
