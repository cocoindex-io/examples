import React from 'react';
import NavbarLayout from '@theme/Navbar/Layout';
import NavbarContent from './Content';

export default function Navbar(): React.ReactElement {
  return (
    <NavbarLayout>
      <NavbarContent />
    </NavbarLayout>
  );
}

