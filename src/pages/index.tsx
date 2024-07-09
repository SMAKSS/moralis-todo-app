import dynamic from "next/dynamic";
import { Container } from "@mui/material";

const ItemList = dynamic(() => import("../components/TodoList"), {
  ssr: false,
});

const IndexPage = () => {
  return (
    <Container>
      <ItemList />
    </Container>
  );
};

export default IndexPage;
