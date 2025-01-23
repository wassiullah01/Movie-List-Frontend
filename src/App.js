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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
    <Route exact path="/" element={<MoviesList />} />
    <Route path="/signIn" element={<SignIn />} />
    <Route path="/signUp" element={<SignUp />} />
    <Route path="/add" element={<AddMovie />} />
    <Route path="/view/:id" element={<ViewMovie />} /> 
    <Route path="/edit/:id" element={<EditMovie />} />
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
