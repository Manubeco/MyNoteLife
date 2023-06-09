import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content"; //Nome das linhas

  > main {
    grid-area: content;
    overflow-y: scroll; //Quando o conteúdo não couber na vertical, irá aparecer uma barra para scrollar
    padding: 64px 0;
  }
`;

export const Links = styled.ul`
  list-style: none; //Para retirar os pontos da lista

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
      overflow-wrap: break-word; //Quebrar linha
    }
  }
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
    overflow-wrap: break-word; //Quebrar linha
  }
`;
