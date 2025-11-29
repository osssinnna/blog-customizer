import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, MouseEvent } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleToggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	const handleApplyArticleState = (nextState: ArticleStateType) => {
		setArticleState(nextState);
	};

	const handleMainClick = (event: MouseEvent<HTMLElement>) => {
		if (!isSidebarOpen) return;

		const target = event.target as HTMLElement;

		if (target.closest('aside')) return;

		if (target.closest('[data-sidebar-toggle]')) return;

		setIsSidebarOpen(false);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleState.fontFamilyOption.value,
					'--font-size': articleState.fontSizeOption.value,
					'--font-color': articleState.fontColor.value,
					'--container-width': articleState.contentWidth.value,
					'--bg-color': articleState.backgroundColor.value,
				} as CSSProperties
			}
			onClick={handleMainClick}>
			<ArticleParamsForm
				isOpen={isSidebarOpen}
				onToggle={handleToggleSidebar}
				articleState={articleState}
				onApply={handleApplyArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
