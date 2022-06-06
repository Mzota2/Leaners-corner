import React from 'react';
import Home from './components/Home';
import About from './components/About';
import List from './components/List';
import {Routes , Route} from 'react-router-dom';
import Contact from './components/Contact';
import Sign from './components/Sign';
import Error from './components/Error';
import Online from './components/Online';
import History from './subjects/History';
import HistoryLessons from './subjects/HistoryLessons';
import AdmaQuiz from './subjects/AdditionalMathematics';
import AdmaLessons from './subjects/AdLessons';
import AgriQuiz from './subjects/Agriculture1';
import AgriLessons from './subjects/AgricultureLessons';
import BiologyLessons from './subjects/BiologyLessons';
import BiologyQuiz from './subjects/Biology';
import ArtLessons from './subjects/ArtLessons';
import ArtQuiz from './subjects/Arts';
import BkQuiz from './subjects/Bk1';
import BkLessons from './subjects/BkLessons1';
import BusinessLessons from './subjects/BusinessLessons';
import BusinessQuiz from './subjects/Business';
import ChemistryQuiz from './subjects/Chemistry';
import ChemistryLessons from './subjects/ChemistryLessons';
import ChichewaQuiz from './subjects/Chichewa1';
import ChichewaLessons from './subjects/ChichewaLessons1';
import ComputerQuiz from './subjects/Computer';
import ComputerLessons from './subjects/ComputerLessons';
import EnglishQuiz from './subjects/English1';
import EnglishLessons from './subjects/EnglishLessons1'
import FrenchQuiz from './subjects/French1';
import FrenchLessons from './subjects/FrenchLessons1';
import GeogQuiz from './subjects/Geography';
import GeogLessons from './subjects/GeographyLessons';
import LifeQuiz from './subjects/Life1';
import LifeLessons from './subjects/LifeLessons1';
import MathematicsQuiz from './subjects/Mathematics';
import MathematicsLessons from './subjects/MathematicsLessons';
import PhysicsQuiz from './subjects/Physics';
import PhysicsLessons from './subjects/PhysicsLessons';
import ScienceQuiz from './subjects/PrimaryScience';
import ScienceLessons from './subjects/PrimaryScienceLessons';
import SocialQuiz from './subjects/Social1';
import SocialLessons from './subjects/SocialLessons1';



function App(props) {
  return (
    
    <div>
      <List/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/sign' element={<Sign/>}/>
        <Route path='/online' element={<Online/>} />
        <Route path='/history' element={<History/>}/>
        <Route path='/historylessons' element={<HistoryLessons/>}/>
        <Route path ='/admaQuiz' element={<AdmaQuiz/>}/>
        <Route path ='/admaLessons' element={<AdmaLessons/>}/>
        <Route path='/agriLessons' element={<AgriLessons/>}/>
        <Route path='/agriQuiz' element={<AgriQuiz/>} />
        <Route path='/artLessons' element={<ArtLessons/>} />
        <Route path='/artQuiz' element={<ArtQuiz/>} />
        <Route path='/bioLessons' element={<BiologyLessons/>} />
        <Route path='/bioQuiz' element={<BiologyQuiz/>}/>
        <Route path='/businessLessons' element={<BusinessLessons/>}/>
        <Route path='/businessQuiz' element={<BusinessQuiz/>} />
        <Route path='/bkLessons' element={<BkLessons/>} />
        <Route path='/bkQuiz' element={<BkQuiz/>} />
        <Route path='/chemistryLessons' element={<ChemistryLessons/>} />
        <Route path='/chemistryQuiz' element={<ChemistryQuiz/>} />
        <Route path='/chichewaQuiz' element={<ChichewaQuiz/>} />
        <Route path='/chichewaLessons' element={<ChichewaLessons/>} />
        <Route path='/computerLessons' element={<ComputerLessons/>} />
        <Route path='/computerQuiz' element={<ComputerQuiz/>} />
        <Route path='/englishLessons' element={<EnglishLessons/>} />
        <Route path='/englishQuiz' element={<EnglishQuiz/>} />
        <Route path='/frenchLessons' element={<FrenchLessons/>} />
        <Route path='/frenchQuiz' element={<FrenchQuiz/>} />
        <Route path='/geogLessons' element={<GeogLessons/>}/>
        <Route path='/geogQuiz' element={<GeogQuiz/>}/>
        <Route path='/lifeLessons' element={<LifeLessons/>} />
        <Route path='/lifeQuiz' element={<LifeQuiz/>} />
        <Route path='/mathematicsLessons' element={<MathematicsLessons/>}/>
        <Route path='/mathematicsQuiz' element={<MathematicsQuiz/>} />
        <Route path='/physicsLessons' element={<PhysicsLessons/>} />
        <Route path='/physicsQuiz' element={<PhysicsQuiz/>} />
        <Route path='/scienceLessons' element = {<ScienceLessons/>} />
        <Route path='/scienceQuiz' element={<ScienceQuiz/>}/>
        <Route path='/socialLessons' element={<SocialLessons/>} />
        <Route path='/socialQuiz' element={<SocialQuiz/>}/>
        
        
        <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  );
}

export default App;
