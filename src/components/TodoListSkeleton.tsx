import { Container, Grid, Skeleton, Stack } from "@mui/material";

const NUMBER_OF_SKELETONS = 8;

export const TodoListSkeleton = () => {
  return (
    <Container sx={{ padding: 2 }} data-testid="todo-list-skeleton">
      <Stack gap={2}>
        <Skeleton
          variant="text"
          width={200}
          height={40}
          data-testid="loading-text"
        />
        <Grid container spacing={2}>
          {Array.from({ length: NUMBER_OF_SKELETONS }).map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton
                variant="rectangular"
                height={150}
                data-testid="loading-rectangular"
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
};
