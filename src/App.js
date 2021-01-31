
import './App.css';

function App() {

  const innerStyled = {
    margin: ' 1em'
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{
          display: 'flex'
        }}>
          <div style={innerStyled}>
            <iframe allowtransparency frameborder="0" height="160" scrolling="no" src="https://www.strava.com/clubs/840512/latest-rides/8a811c1626b6310e2c4ae31b13df7db0b8976c86?show_rides=false" width="300"></iframe>
          </div>
          <div style={innerStyled}>
            <iframe allowtransparency frameborder='0' height='160' scrolling='no' src='https://www.strava.com/clubs/841063/latest-rides/4e1d7bcb6e82dff8415fdaf3c1731e8a91b9b129?show_rides=false' width='300'></iframe>
          </div>
        </div>
      </header>
    </div >
  );
}

export default App;
