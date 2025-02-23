import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <section className="flex flex-col min-h-screen">
      <Header></Header>
      <main className="flex flex-1 flex-col gap-10 m-40 text-center">
        <h1 className="text-5xl font-semibold">Calendar의 모든 것</h1>
        <h1 className="text-5xl font-semibold">S-Calendar에서 쉽고 간편하게</h1>
      </main>
      <Footer></Footer>
    </section>
  );
}
