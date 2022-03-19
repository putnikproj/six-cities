import Main from '../main/main';

type AppProps = {
  placesAmount: number,
};

function App({ placesAmount }: AppProps): JSX.Element {
  return <Main placesAmount={placesAmount} />;
}

export default App;
