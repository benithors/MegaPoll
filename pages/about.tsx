import React from 'react';
import Container from '../components/structure/Container';
import InformationContainer from '../components/generic/InformationContainer';

const about = () => {
  return (
    <Container>
      <div
        className={
          'component-preview mb-8 h-full text-center text-7xl  font-bold text-primary md:text-8xl xl:text-9xl'
        }
      >
        About
      </div>

      <InformationContainer title={'What is this Website About?'}>
        It is a website that is designed to share peoples opinions on all kinds
        of topics.
        <br />
        For this we included social media logins, real time polls, duplicate
        vote protection.
      </InformationContainer>
      <InformationContainer title={'How should you use this Website?'}>
        You can either be the creator of the poll or the voter. <br />
        Create a Poll, add an image and questions that you want to share with
        your favorite community. <br />
        If you get linked to this website, vote on the topic. You can also visit
        the main page and see what are currently trending polls.
      </InformationContainer>
    </Container>
  );
};

export default about;
