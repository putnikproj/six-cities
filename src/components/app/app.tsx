import MainPage from '../main-page/main-page';

type AppProps = {
  placesAmount: number,
};

function App({ placesAmount }: AppProps): JSX.Element {
  return <MainPage placesAmount={placesAmount} />;
}

export default App;
