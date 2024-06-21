import { Container, Skeleton } from "@mui/material";

export const TodoDetailSkeleton = () => {
  return (
    <Container sx={{ padding: 2 }}>
      <Skeleton variant="text" width={200} height={40} />
      <Skeleton variant="rectangular" height={200} />
    </Container>
  );
};
