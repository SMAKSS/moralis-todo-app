import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

const ItemList = dynamic(() => import('../components/TodoList'), {
  ssr: false,
});

const ItemDetail = dynamic(() => import('../components/TodoDetail'), {
  ssr: false,
});

const IndexPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      {!id && <ItemList />}
      {id && <ItemDetail />}
    </>
  );
};

export default IndexPage;
