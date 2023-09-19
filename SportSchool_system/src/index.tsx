import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'font-awesome/css/font-awesome.min.css';

import './site.css'
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Login from './routes/identity/Login';
import Register from './routes/identity/Register';
import Privacy from './routes/Privacy';
import Competition from './routes/competition/Competition';
import Location from './routes/location/Location';
import CompetitionCreate from './routes/competition/CompetitionCreate';
import CompetitionJoin from './routes/competitionJoin/UserAtCompetition';
import UserAtCompetition from './routes/competitionJoin/UserAtCompetition';
import Index from './routes/index/Index';
import UserAtCompetitionAdd from './routes/competitionJoin/UserAtCompetitionAdd';
import UserCompetitionList from './routes/competition/UserCompetitionList';
import UserAtCompetitionRemove from './routes/competitionJoin/UserAtCompetitionRemove';
import CompetitionRemove from './routes/competition/CompetitionRemove';
import LocationAdd from './routes/location/LocationAdd';
import LocationRemove from './routes/location/LocationRemove';
import Training from './routes/training/Training';
import Excercise from './routes/Excercise/Excercise';
import ExcerciseAdd from './routes/Excercise/ExcerciseAdd';
import ExcerciseRemove from './routes/Excercise/ExcerciseRemove';
import TrainingAdd from './routes/training/TrainingAdd';
import TrainingRemove from './routes/training/TrainingRemove';
import UserAtTrainingAdd from './routes/UserAtTraining/UserAtTrainingAdd';
import UsersAtTraining from './routes/training/UsersAtTraining';
import UserAtTrainingRemove from './routes/UserAtTraining/UserAtTrainingRemove';
import UsersAttendingTraining from './routes/training/UserAttendingTraining';
import Message from './routes/message/Message';
import MessageAdd from './routes/message/MessageAdd';
import MessageRemove from './routes/message/MessageRemove';
import MessageUpdate from './routes/message/MessageUpdate';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
          {
              path: "/",
              element: <Index />,
          },
          {
              path: "login/",
              element: <Login />,
          },
          {
              path: "register/",
              element: <Register />,
          },
          {
              path: "privacy/:id?",
              element: <Privacy />,
          },
          {
            path: "competition/:id?",
            element: <Competition />,
          },
          {
            path: "location/:id?",
            element: <Location />,
          },
          {
            path: "competitionCreate/:id?",
            element: <CompetitionCreate />,
          },
          {
            path: "userAtCompetitionAdd/:id",
            element: <UserAtCompetitionAdd />,
          },
          {
            path: "userCompetitionList/:id?",
            element: <UserCompetitionList />,
          },
          {
            path: "userAtCompetitionRemove/:id",
            element: <UserAtCompetitionRemove />,
          },
          {
            path: "competitionRemove/:id",
            element: <CompetitionRemove />,
          },
          {
            path: "locationAdd/:id?",
            element: <LocationAdd />,
          },
          {
            path: "locationRemove/:id",
            element: <LocationRemove />,
          },
          {
            path: "training/:id?",
            element: <Training />,
          },
          {
            path: "excercise/:id?",
            element: <Excercise />,
          },
          {
            path: "excerciseAdd/:id?",
            element: <ExcerciseAdd />,
          },
          {
            path: "excerciseRemove/:id",
            element: <ExcerciseRemove />,
          },
          {
            path: "trainingAdd/:id?",
            element: <TrainingAdd />,
          },
          {
            path: "trainingRemove/:id?",
            element: <TrainingRemove />,
          },
          {
            path: "userAtTrainingAdd/:id",
            element: <UserAtTrainingAdd />,
          },
          {
            path: "usersAtTraining/:id?",
            element: <UsersAtTraining />,
          },
          {
            path: "userAtTrainingRemove/:id/:user?",
            element: <UserAtTrainingRemove />,
          },
          {
            path: "usersAttendingTraining/:id?",
            element: <UsersAttendingTraining />,
          },
          {
            path: "message/:id?",
            element: <Message />,
          },
          {
            path: "messageAdd/:id?",
            element: <MessageAdd />,
          },
          {
            path: "messageRemove/:id",
            element: <MessageRemove />,
          },
          {
            path: "messageUpdate/:id",
            element: <MessageUpdate />,
          },
          
          
      ]
  },


]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);


