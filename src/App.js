import './App.css';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider
} from "react-router-dom";
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import MoviesList from './pages/movies/MoviesList';
import AddMovie from './pages/movies/AddMovie';
import ViewMovie from './pages/movies/ViewMovie';
import EditMovie from './pages/movies/EditMovie';
import RootLayout from './routes/RootLayout';
import NotFound from './pages/auth/NotFound';
import AdminTabel from './pages/admin/AdminTabel';
// import PrivateRoutes from './routes/PrivateRoutes';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path="/signIn" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/" element={<MoviesList />} />
      <Route path="/add-movie" element={<AddMovie />} />
      <Route path="/view-movie/:id" element={<ViewMovie />} />
      <Route path="/update-movie/:id" element={<EditMovie />} />
      <Route path="/admin" element={<AdminTabel />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;
