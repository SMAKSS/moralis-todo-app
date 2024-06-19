import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Todo } from '../api/Todo';
import { Button, Container, Input } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const TodoDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [todo, setTodo] = useState<Todo | undefined>();
  const [editableItem, setEditableItem] = useState<Todo | undefined>();

  const fetchItemDetails = async () => {
    // TODO: Fetch todos from API
    const mockTodo = { id: 0, name: 'todo', description: 'description' };
    setTodo(mockTodo);
    setEditableItem(mockTodo);
  };

  // Fetch item details when the id changes
  React.useEffect(() => {
    if (id) {
      fetchItemDetails();
    }
  }, [id]);

  const handleUpdate = async (updatedItem: Todo) => {
    setEditableItem(updatedItem);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editableItem) {
      const updatedItem = { ...editableItem, name: e.target.value };
      setEditableItem(updatedItem);
    }
  };

  const navigateToList = () => {
    window.location.href = '/';
  };

  if (!editableItem) {
    return <div>Error: {'Item not found'}</div>;
  }

  return (
    <Container>
      <h1>{editableItem.name}</h1>
      <p>{editableItem.description}</p>
      <label>
        Change item name:
        <Input value={editableItem.name} onChange={handleNameChange} />
      </label>
      <p>
        <Button onClick={() => handleUpdate(editableItem)} variant='contained'>
          <CheckIcon /> Save changes
        </Button>
        <Button onClick={() => navigateToList()}>
          <ArrowBackIosIcon /> Back to list
        </Button>
      </p>
    </Container>
  );
};

export default TodoDetail;
