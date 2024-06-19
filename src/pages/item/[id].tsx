import { Todo } from '../../api/Todo';
import ItemDetail from '../../components/TodoDetail';

const ItemDetailPage = ({ passedItem }: { passedItem: Todo | null }) => {
  return <ItemDetail />;
};

export default ItemDetailPage;
