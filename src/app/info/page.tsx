import { NextPage } from 'next';
import InfoPage from '@/modules/info';

const App: NextPage = () => {
	return (
		<main className="mt-8">
			<InfoPage />
		</main>
	);
};

export default App;
