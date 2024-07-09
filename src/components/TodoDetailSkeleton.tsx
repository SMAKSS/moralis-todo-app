import { Container, Skeleton, Stack } from "@mui/material";

export const TodoDetailSkeleton = () => {
  return (
    <Container sx={{ padding: 2 }} data-testid="todo-detail-skeleton">
      <Stack gap={2}>
        <Skeleton
          variant="text"
          width={200}
          height={40}
          data-testid="loading-text"
        />
        <Skeleton
          variant="rectangular"
          height={200}
          data-testid="loading-rectangular"
        />
      </Stack>
    </Container>
  );
};
