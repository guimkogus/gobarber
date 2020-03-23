import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => (props.err ? 'red' : '#7159c1')};
  font-family: Arial, Helvetica, sans-serif;

  p {
    font-size: 14px;
    color: #333;
  }
`;
