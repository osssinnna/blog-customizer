import { FormEvent, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	onApply: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	const panelRef = useRef<HTMLDivElement | null>(null);

	const handleToggleForm = () => {
		setIsFormOpen((prev) => !prev);
	};

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	useEffect(() => {
		if (!isFormOpen) {
			return;
		}

		const handleClick = (event: MouseEvent) => {
			if (!panelRef.current) return;

			const target = event.target as Node;

			if (panelRef.current.contains(target)) return;

			setIsFormOpen(false);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setIsFormOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClick);
		window.addEventListener('keydown', handleKeyDown);

		return () => {
			window.removeEventListener('mousedown', handleClick);
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFormOpen]);

	return (
		<div className={styles.panel} ref={panelRef}>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isFormOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text
						as='h2'
						size={31}
						weight={800}
						uppercase
						align='left'
						family='open-sans'>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontFamilyOption: option,
							}))
						}
					/>

					<RadioGroup
						name='font-size'
						title='Размер шрифта'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontSizeOption: option,
							}))
						}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								fontColor: option,
							}))
						}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								backgroundColor: option,
							}))
						}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) =>
							setFormState((prev) => ({
								...prev,
								contentWidth: option,
							}))
						}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</div>
	);
};
