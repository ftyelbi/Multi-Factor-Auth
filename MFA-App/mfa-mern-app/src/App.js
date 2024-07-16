mport logo from './logo.svg';
import './App.css';
import HelloWorld from './HelloWorld'; // Import the new component

function App() {
	  return (
		      <div className="mfa-App">
		        <header className="mfa-App-header">
		          <img src={logo} className="App-logo" alt="logo" />
		          <p>Welcome to My App!</p>
		          <a
		            className="App-link"
		            href="(link unavailable)"
		            target="_blank"
		            rel="noopener noreferrer"
		          >
		            Learn React
		          </a>
		        </header>
		        <HelloWorld /> // Add the new component here
		      </div>
		    );
}

export default App;
