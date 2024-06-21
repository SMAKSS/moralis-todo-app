import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { Container } from "@mui/material";

const ItemList = dynamic(() => import("../components/TodoList"), {
  ssr: false,
});

const IndexPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Container>
      <ItemList />
    </Container>
  );
};

export default IndexPage;
