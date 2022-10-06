import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import LayoutRoutes from '../shared/components/LayoutRoutes/LayoutRotes';
import Unauthorized from '../pages/Unauthorized/Unauthorized';
import { Suspense, lazy, useEffect, useState } from 'react';
import RequireAuth from '../shared/features/RequireAuth';
import axios from '../interceptors/axios';
import { Loading } from '../shared/components/Loading/Loading';
import { MyPageRoute } from '../shared/components/MyPageRoute/MyPageRoute';
import ClassesPage from '../pages/ClassesPage/ClassesPage';
import LecturesPage from '../pages/LecturesPage/LecturesPage';
import WorkPage from '../pages/WorkPage/WorkPage';
import AssessmentsPage from '../pages/AssessmentsPage/AssessmentsPage';
import { ManagementPage } from '../pages/ManagementPage/ManagementPage';
import { MyLayout } from '../shared/layouts/MyLayout';
export const AppRoutes = () => {
  const [signedUser, setSignedUser] = useState(false);
  const navigate = useNavigate();

  const SignPage = lazy(() =>
    import('../pages/SignPage/SignPage').then(({ SignPage }) => ({
      default: SignPage,
    }))
  );

  useEffect(() => {
    // axios
    //   .get('auth/whoami', {
    //     headers: { 'Content-Type': 'application/json' },
    //     withCredentials: true,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     if (res.status === 200) {
    //       setSignedUser(true);
    //       navigate('/my', { replace: true });
    //       return res.data;
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<LayoutRoutes />}>
        {/* public routes */}
        {!signedUser ? (
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <LandingPage />
              </Suspense>
            }
          />
        ) : (
          <Route path="/my" element={<MyPageRoute />} />
        )}
        {!signedUser ? (
          <Route
            path="/sign"
            element={
              <Suspense fallback={<Loading />}>
                <SignPage />
              </Suspense>
            }
          />
        ) : (
          <Route path="/my" element={<MyPageRoute />} />
        )}
        {!signedUser ? (
          <Route path="/unauthorized" element={<Unauthorized />} />
        ) : (
          <Route path="/my" element={<MyPageRoute />} />
        )}

        {/*  private routes */}
        {/*Separate Protected Nested Routes with every role. For now Admin, Student and Professor are allowed */}

        <Route
          element={
            <RequireAuth allowedRoles={['admin', 'student', 'professor']} />
          }
        >
          <Route path="/my" element={<MyPageRoute />}>
            <Route element={<MyLayout />}>
              <Route path="classes" element={<ClassesPage />} />
              <Route path="lecture" element={<LecturesPage />} />
              <Route path="work" element={<WorkPage />} />
              <Route path="assessment" element={<AssessmentsPage />} />
              <Route path="management" element={<ManagementPage />} />
            </Route>
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
};
