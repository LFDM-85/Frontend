import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import LayoutRoutes from '../shared/components/LayoutRotes';
import Unauthorized from '../pages/Unauthorized';
import { Suspense, lazy, useEffect, useState } from 'react';
import RequireAuth from '../shared/features/RequireAuth';
import axios from '../interceptors/axios';
import { Loading } from '../shared/components/Loading';
import { MyPageRoute } from '../shared/components/MyPageRoute';
import CoursesPage from '../pages/CoursesPage';
import LecturesPage from '../pages/LecturesPage';
import WorkPage from '../pages/WorkPage';
import AssessmentsPage from '../pages/AssessmentsPage';
import { ManagementPage } from '../pages/ManagementPage';
import { MyLayout } from '../shared/layouts/MyLayout';
import CourseManagement from '../shared/components/CourseManagement';
import PeopleManagement from '../shared/components/PeopleManagement';
import jwt_decode from 'jwt-decode';
import useAuth from '../shared/hooks/useAuth';

export const AppRoutes = () => {
  const [signedUser, setSignedUser] = useState(false);
  const navigate = useNavigate();
  const authCtx = useAuth();

  const [token, setToken] = useState(localStorage.getItem('accessToken') || '');
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken') || ''
  );

  const SignPage = lazy(() =>
    import('../pages/SignPage').then(({ SignPage }) => ({
      default: SignPage,
    }))
  );

  const userId = authCtx.user._id;

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post('auth/refresh', {
          userId,
          refreshToken,
        });
        const newToken = res.data.token;
        setToken(newToken);
        localStorage.setItem('accessToken', newToken);
        setRefreshToken(refreshToken);
        setSignedUser(true);
      } catch (err) {
        console.error(err);
        setSignedUser(false);
      }
    };

    if (!token) {
      return setSignedUser(false);
    } else {
      setSignedUser(true);
      const decoded = jwt_decode<{ exp: number }>(token);

      const tokenExpiration = decoded.exp * 1000;
      const now = Date.now();
      if (tokenExpiration - now < 60 * 60 * 1000) {
        refresh();
      }
    }
  }, [token, refreshToken]);

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }, [token]);

  return (
    <>
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
          {/* {!signedUser ? (
            <Route path="/unauthorized" element={<Unauthorized />} />
          ) : (
            <Route path="/my" element={<MyPageRoute />} />
          )} */}

          {/*  private routes */}
          {/*Separate Protected Nested Routes with every role. For now Admin, Student and Professor are allowed */}

          <Route
            element={
              <RequireAuth allowedRoles={['admin', 'student', 'professor']} />
            }
          >
            <Route path="/my" element={<MyPageRoute />}>
              <Route element={<MyLayout />}>
                <Route path="courses" element={<CoursesPage />} />
                <Route path="lecture" element={<LecturesPage />} />
                <Route path="work" element={<WorkPage />} />
                <Route path="assessment" element={<AssessmentsPage />} />
                <Route path="management" element={<ManagementPage />}>
                  <Route
                    path="management/course"
                    element={<CourseManagement />}
                  />
                  <Route
                    path="management/staff"
                    element={<PeopleManagement />}
                  />
                </Route>
              </Route>
            </Route>
          </Route>

          {/* catch all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
};
