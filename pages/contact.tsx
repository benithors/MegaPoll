import React from 'react';
import Container from '../components/structure/Container';
import InformationContainer from '../components/generic/InformationContainer';
import { EmailContactButton } from '../components/generic/EmailContactButton';

const contact = () => {
  return (
    <Container>
      <div
        className={
          'component-preview mb-8 text-center text-7xl font-bold  text-primary md:text-8xl xl:text-9xl'
        }
      >
        Contact
      </div>

      <InformationContainer title={'How to Contact us'}>
        If you have any questions, feedback, complaints please feel free to
        contact us at any time via <EmailContactButton />
        <br />
        You may also contact us via the following social media channels
        <button className={'btn-link px-1'}>
          <a
            href={'https://twitter.com/megapollme'}
            aria-label={'twitter to the creator of this website'}
          >
            Twitter
          </a>
        </button>
        <button className={'btn-link'}>
          <a
            href={'https://github.com/benithors'}
            aria-label={'github to the creator of this website'}
          >
            GitHub
          </a>
        </button>
      </InformationContainer>
    </Container>
  );
};

export default contact;
