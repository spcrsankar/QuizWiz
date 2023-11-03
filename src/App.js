import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from './components/ScrollToTop';
import Register from './components/Register';
import Login from './components/Login';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './components/Home'
import CreateQuiz from './components/CreateQuiz'
import MyQuiz from './components/MyQuiz'
import QuizCategory from './components/QuizCategory'
import QuizHistory from './components/QuizHistory'
import Leaderboard from './components/Leaderboard'
import EditProfile from './components/EditProfile'
import ContactUs from './components/ContactUs'
import NavbarContactUs from './components/NavbarContactUs'

import Footer from './components/Footer';
import AddQuestion from './components/AddQuestion';
import StartQuizWithTimeLimit from './components/StartQuizWithTimeLimit';
import StartQuizWithNoLimit from './components/StartQuizWithNoLimit';
import Result from './components/Result';
import NavbarLogin from './components/NavbarLogin';
import NotFoundComponent from './components/NotFoundComponent';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <ScrollToTop /> 
        <Routes>
        
          <Route path='*' element={<NotFoundComponent/>} />

          <Route path="/" element={<><NavbarLogin/><Login/> <Footer/> </>} />
          <Route path="register" element={<> <NavbarLogin/><Register/> <Footer/> </>} />
         
          <Route path="home" element={<>
        <Navbar />
        <div className="row middle-row">
          <div className="col-3 left-col">
          <Sidebar />
          </div>
          <div className="col-3"></div>
          <div className="col-9 right-col">
          <Home />
          </div>
        </div>
        </>
      } />

          <Route path="create-quiz" element={<> <Navbar/> <CreateQuiz/> <Footer/> </>} />
          <Route path="add-question" element={<> <Navbar/> <AddQuestion/> <Footer/> </>} />

          <Route path="my-quiz" element={<>
        <Navbar />
        <div className="row middle-row">
          <div className="col-3 left-col">
          <Sidebar />
          </div>
          <div className="col-3"></div>
          <div className="col-9 right-col">
          <MyQuiz />
          </div>
        </div>
        </>
      } />

          <Route path="all-quizzes" element={<>
        <Navbar />
        <div className="row middle-row">
          <div className="col-3 left-col">
          <Sidebar />
          </div>
          <div className="col-3"></div>
          <div className="col-9 right-col">
          <QuizCategory />
          </div>
        </div>
        </>
      } />

          <Route path="start-quiz-time-limit" element={<> <Navbar/> <StartQuizWithTimeLimit/> <Footer/> </>} />
          <Route path="start-quiz-no-limit" element={<> <Navbar/> <StartQuizWithNoLimit/> <Footer/> </>} />
          <Route path="result" element={<> <Navbar/> <Result /> <Footer/> </>} />

          <Route path="quiz-history" element={<>
        <Navbar />
        <div className="row middle-row">
          <div className="col-3 left-col">
          <Sidebar />
          </div>
          <div className="col-3"></div>
          <div className="col-9 right-col">
          <QuizHistory />
          </div>
        </div>
        </>
      } />

          <Route path="leaderboard" element={<> <Navbar/> <Leaderboard/> <Footer/> </>} />
          <Route path="contact-us" element={<> <NavbarContactUs/> <ContactUs/> <Footer/> </>} />

          <Route path="edit-profile" element={<>
        <Navbar />
        <div className="row middle-row">
          <div className="col-3 left-col">
          <Sidebar />
          </div>
          <div className="col-3"></div>
          <div className="col-9 right-col">
          <EditProfile />
          </div>
        </div>
        </>
      } />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
