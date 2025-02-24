import React from 'react';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';

export default function RootLayout() {
  return (
    <section>
      <Header />
      <Home />
      <Footer />
    </section>
  );
}
