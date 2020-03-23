import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: ${(props) => (props.err ? 'red' : '#FFF')};
  font-family: Arial, Helvetica, sans-serif;

  p {
    font-size: 14px;
    color: #333;
  }
`;
