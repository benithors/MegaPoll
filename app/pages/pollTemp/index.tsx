import React from "react";
import { GetServerSideProps } from "next";
import Container from "../../components/Container";

interface IProps {}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  };
};

const Poll = (props: IProps) => {
  return <Container>sd</Container>;
};

export default Poll;
