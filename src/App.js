import logo from './logo.svg';
import trophy from './icons-trophy.png';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import { TiTickOutline } from 'react-icons/ti';
var bgColors = {
  Default: '#81b71a',
  Blue: `#00B1E1`,
  Cyan: '#37BC9B',
  Green: '#8CC152',
  Red: '#E9573F',
  Yellow: '#F6BB42',
};
function App() {
  const [countries, setCountriesData] = useState([]);
  const [randomCountry, setRandomCountry] = useState();
  const [randomCountryCapital, setRandomCountryCapital] = useState();
  const [countryLength, setCountryLength] = useState();
  const [initRender, setInitRender] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [nextBtnEnable, setNextBtnEnable] = useState(false);
  const [count, setCount] = useState(0);
  const [score, setScore] = useState(0);
  const [flagUrl, setFlagUrl] = useState();
  const [showFlag, setShowFlag] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [options, setOptions] = useState([
    {
      id: 'A',
      answer_option: 'option1',
      is_correct: false,
      color: 'transparent',
      tick: false,
      cross: false,
    },
    {
      id: 'B',
      answer_option: 'option2',
      is_correct: false,
      color: 'transparent',
      tick: false,
      cross: false,
    },
    {
      id: 'c',
      answer_option: 'option3',
      is_correct: false,
      color: 'transparent',
      tick: false,
      cross: false,
    },
    {
      id: 'D',
      answer_option: 'option4',
      is_correct: true,
      color: 'transparent',
      tick: false,
      cross: false,
    },
  ]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((res) => {
      setCountriesData(res.data);
      console.log(res.data);
      // console.log(res.data.length);
      setCountryLength(res.data.length);
      let random_nums = [];
      let random = Math.floor(Math.random() * res.data.length);
      random_nums.push(random);
      console.log(random);
      setRandomCountryCapital(res.data[random].capital);
      setRandomCountry(res.data[random].name.common);
      setFlagUrl(res.data[random].flags.svg);
      let optionArray = [
        {
          id: 'A',
          answer_option: 'option',
          is_correct: false,
          color: 'transparent',
          tick: false,
          cross: false,
        },
        {
          id: 'B',
          answer_option: 'option',
          is_correct: false,
          color: 'transparent',
          tick: false,
          cross: false,
        },
        {
          id: 'c',
          answer_option: 'option',
          is_correct: false,
          color: 'transparent',
          tick: false,
          cross: false,
        },
        {
          id: 'D',
          answer_option: 'option',
          is_correct: false,
          color: 'transparent',
          tick: false,
          cross: false,
        },
      ];
      let randomOption = Math.floor(Math.random() * 4);
      optionArray[randomOption].answer_option = res.data[random].name.common;

      let optionCount = 0;
      while (optionCount < 3) {
        randomOption = Math.floor(Math.random() * 4);
        if (optionArray[randomOption].answer_option === 'option') {
          random = Math.floor(Math.random() * res.data.length);
          let duplicate = random_nums.find((num) => num === random);

          if (duplicate === random) {
            random++;
          }
          random_nums.push(random);

          optionArray[randomOption].answer_option =
            res.data[random].name.common;
          optionArray[randomOption].is_correct = false;
          optionCount++;
        }
      }

      console.log(optionArray[0]);

      setOptions(optionArray);
      setInitRender(true);
    });
  }, []);

  const randomQuestion = () => {
    setNextBtnEnable(false);
    let random_nums = [];
    let random = Math.floor(Math.random() * countryLength);
    console.log(random);
    random_nums.push(random);
    setRandomCountryCapital(countries[random].capital);
    setRandomCountry(countries[random].name.common);
    setFlagUrl(countries[random].flags.svg);
    let randomOption = Math.floor(Math.random() * 4);
    let optionArray = [
      {
        id: 'A',
        answer_option: 'option',
        is_correct: false,
        color: 'transparent',
        tick: false,
        cross: false,
      },
      {
        id: 'B',
        answer_option: 'option',
        is_correct: false,
        color: 'transparent',
        tick: false,
        cross: false,
      },
      {
        id: 'C',
        answer_option: 'option',
        is_correct: false,
        color: 'transparent',
        tick: false,
        cross: false,
      },
      {
        id: 'D',
        answer_option: 'option',
        is_correct: false,
        color: 'transparent',
        tick: false,
        cross: false,
      },
    ];
    optionArray[randomOption].answer_option = countries[random].name.common;
    optionArray[randomOption].is_correct = true;

    let optionCount = 0;
    while (optionCount < 3) {
      randomOption = Math.floor(Math.random() * 4);
      if (optionArray[randomOption].answer_option === 'option') {
        random = Math.floor(Math.random() * countryLength);
        let duplicate = random_nums.find((num) => num === random);

        if (duplicate === random) {
          random++;
        }
        random_nums.push(random);
        optionArray[randomOption].answer_option = countries[random].name.common;
        optionArray[randomOption].is_correct = false;
        optionCount++;
      }
    }

    console.log(optionArray[0]);

    setOptions(optionArray);
    setDisableBtn(false);
    if (count === 3) {
      setShowFlag(true);
    } else {
      setShowFlag(false);
    }

    if (count <= 3) {
      setShowResult(false);
    } else {
      setShowResult(true);
    }
  };
  const handleChange = (userAnswere, country) => {
    console.log(userAnswere);

    let newOptions = [...options];
    if (userAnswere === country) {
      for (let i = 0; i < 4; i++) {
        if (newOptions[i].answer_option === userAnswere) {
          newOptions[i].color = 'green';
          setScore(score + 1);
          newOptions[i].tick = 'true';
        }
      }
    } else {
      for (let i = 0; i < 4; i++) {
        if (newOptions[i].answer_option === country) {
          newOptions[i].color = 'green';
          newOptions[i].tick = 'true';
        }
        if (newOptions[i].answer_option === userAnswere) {
          newOptions[i].color = 'orange';
          newOptions[i].cross = 'true';
        }
      }
    }
    setCount(count + 1);
    setOptions(newOptions);
    setDisableBtn(true);
    setNextBtnEnable(true);
  };
  const handleReset = () => {
    setCount(0);
    setScore(0);
    randomQuestion();
    setShowResult(false);
  };

  return (
    <div className="App">
      <h1 className="quiz-heading">COUNTRY QUIZ</h1>
      <img className="image-logo" src={logo} alt="logo"></img>
      <div className="quiz-box">
        {!showResult ? (
          <div>
            {showFlag ? (
              <>
                <img
                  className="flag-ques-img"
                  src={flagUrl}
                  alt="flag url"
                ></img>
                <h4>Which country does this flag belog to?</h4>
              </>
            ) : (
              <h4 className="capital-name">
                {randomCountryCapital} is the capital of
              </h4>
            )}

            {options.map((data) => {
              return (
                <ul>
                  <li>
                    <button
                      disabled={disableBtn}
                      className="btn"
                      style={{ backgroundColor: data.color }}
                      onClick={() => {
                        handleChange(data.answer_option, randomCountry);
                      }}
                    >
                      <span> {data.id} &nbsp; </span>
                      {data.answer_option}
                      <span> &nbsp; </span>
                      <span className="tick-cross-span">
                        {data.tick ? <TiTickOutline /> : null}{' '}
                        {data.cross ? <RxCrossCircled /> : null}
                      </span>
                    </button>
                  </li>
                </ul>
              );
            })}
            {nextBtnEnable && (
              <button className="next-btn" onClick={randomQuestion}>
                Next
              </button>
            )}
          </div>
        ) : (
          <div>
            <img className="trophy-img" src={trophy} alt="trophy"></img>
            <h1 className="result">Results</h1>
            <p className="text-para">You got {score} correct answers</p>
            <button
              className="tryagain-btn"
              onClick={() => {
                handleReset();
              }}
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
