import { ReactElement, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Word2Story = lazy(() => import("./pages/Word2Story"));

const AppRouter = (): ReactElement => {
  return (
    <Suspense>
      <Routes>
        <Route path="/word2story" element={<Word2Story />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
