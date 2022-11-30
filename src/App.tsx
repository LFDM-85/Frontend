import { AppRoutes } from './routes';
import Header from './shared/components/UI/Header';

export const App = () => {
  return (
    <>
      <Header />
      <AppRoutes />
    </>
  );
};
