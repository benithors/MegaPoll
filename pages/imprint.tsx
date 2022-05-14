import React from 'react';
import Container from '../components/structure/Container';
import Heading from '../components/generic/Heading';

const imprint = () => {
  return (
    <Container>
      <div
        className={
          'component-preview mb-8 text-center text-7xl font-bold  text-primary md:text-8xl xl:text-9xl'
        }
      >
        Imprint
      </div>
      <div className={'flex flex-col px-6'}>
        <Heading>Company</Heading>
        <div>
          Benjamin Thorstensen Bsc.
          <br />
          Business purpose: IT Services
        </div>

        <Heading>Contact</Heading>
        <div>
          Member of the Vienna Chamber of Commerce (Wirtschaftskammer Wien)
        </div>

        <Heading>Professional Law</Heading>
        <div>
          Commerce Order (Gewerbeordnung)
          <br />
          www.ris.bka.gv.at
          <br />
          Supervisory authority/commercial authority
          <br />
          Authority according to ECG (E-Commerce Act) Municipal District Office
          of the 10th District, MBA 10
          <br />
          Consumers have the possibility to submit complaints to the EU online
          dispute resolution platform: https://ec.europa.eu/odr
          <br />
          You can also send any complaints to the above e-mail address.
          <br />
        </div>

        <Heading>Liability for the content of this website</Heading>
        <div>
          I am constantly developing the content of this website and strive to
          provide correct and up-to-date information. Unfortunately, I cannot
          assume any liability for the correctness of all contents on this
          website, especially for those provided by third parties. If you notice
          any problematic or illegal content, please contact me immediately at
          the email mentioned above!
        </div>
      </div>
    </Container>
  );
};

export default imprint;
