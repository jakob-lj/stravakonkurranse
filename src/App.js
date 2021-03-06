
import { useEffect, useState } from 'react';
import './App.css';

const innerStyled = {
  margin: ' 1em'
}

const getTimeString = (num) => {
  num = Math.round(num, 2)
  if (num < 10) {
    return `0${num}`
  } else {
    return num
  }
}

const CountDown = ({ goal, text, setState }) => {

  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      if (goal <= new Date()) {
        setState("ended")
      }
      setNow(new Date());
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const diff = goal - now

  const seconds = getTimeString((diff / 1000) % 60);
  const minutes = getTimeString(diff / (1000 * 60) % 60);
  const hours = getTimeString(diff / (1000 * 3600) % 24);
  const days = getTimeString(diff / (1000 * 3600 * 24));

  const ts = `${days}:${hours}:${minutes}:${seconds}`

  return <div>
    <div>
      <h2>
        {text}
      </h2>
      <span>
        {ts}
      </span>
    </div>
  </div>
}

const ElementWrapper = ({ children }) => {
  return <div className={'elementWrapper'}>
    {children}
  </div>
}

const Iframes = () => {
  return (
    <ElementWrapper>
      <div style={innerStyled}>
        <iframe title={'Basket'} allowtransparency frameborder='0' height='160' scrolling='no' src='https://www.strava.com/clubs/841063/latest-rides/4e1d7bcb6e82dff8415fdaf3c1731e8a91b9b129?show_rides=false' width='300'></iframe>
      </div>
      <div style={innerStyled}>
        <iframe allowtransparency frameborder='0' height='160' scrolling='no' src='https://www.strava.com/clubs/841476/latest-rides/db83728ec4a27859defc304a35ca285e8965b361?show_rides=false' width='300'></iframe>
      </div>
      <div style={innerStyled}>
        <iframe title={'Volleyball'} allowtransparency frameborder="0" height="160" scrolling="no" src="https://www.strava.com/clubs/840512/latest-rides/8a811c1626b6310e2c4ae31b13df7db0b8976c86?show_rides=false" width="300"></iframe>
      </div>
    </ElementWrapper>
  )
}

function App() {

  const [state, setState] = useState("loading")

  const start = new Date(2021, 1, 1, 7, 0, 0)
  const end = new Date(2021, 1, 8, 0, 0, 0)

  useEffect(() => {

    if (end < new Date()) {
      setState("ended")
    } else if (start < new Date()) {
      setState("started")

    } else {
      setState("notStarted")
    }

  }, [])

  if (state === "loading") {
    return <Wrapper>
      Loading...
    </Wrapper>
  }

  if (state === "notStarted") {
    return <Wrapper>
      <CountDown goal={start} text={"Konkurransen begynner om"} />
    </Wrapper>
  }


  return (
    <Wrapper>
      {state !== "ended" && <CountDown setState={setState} goal={end} text={"Konkurransen avsluttes om"} />}
      <div style={{
        display: 'block',
        height: '4em'
      }}>
      </div>
      {state === "started" && <Iframes />}
      {state === "ended" && <><h3>Konkurransen er avsluttet</h3><h5>Gratulerer til NTNUI Volleyball med seier og 877 km!</h5></>}
    </Wrapper>

  );
}

export default App;


const Wrapper = ({ children }) => {
  return <div className="App">
    <header className="App-header">
      {children}
    </header>
  </div >
}