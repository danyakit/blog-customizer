import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import { clsx } from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectFontColor, setSelectFontColor] = useState<OptionType>(
		currentArticleState.fontColor
	);
	const [selectFontFamily, setselectFontFamily] = useState<OptionType>(
		currentArticleState.fontFamilyOption
	);
	const [selectFontSize, setSelectFontSize] = useState<OptionType>(
		currentArticleState.fontSizeOption
	);
	const [selectBackgroundColor, setSelectBackgroundColor] =
		useState<OptionType>(currentArticleState.backgroundColor);
	const [selectContentWidth, setSelectContentWidth] = useState<OptionType>(
		currentArticleState.contentWidth
	);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen,
		onChange: setIsOpen,
		event: 'mousedown',
	});

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={(data) => setIsOpen(data)} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState({
							fontColor: selectFontColor,
							fontFamilyOption: selectFontFamily,
							fontSizeOption: selectFontSize,
							backgroundColor: selectBackgroundColor,
							contentWidth: selectContentWidth,
						});
					}}
					onReset={(e) => {
						e.preventDefault();
						setCurrentArticleState({
							fontFamilyOption: fontFamilyOptions[0],
							fontColor: fontColors[0],
							backgroundColor: backgroundColors[0],
							contentWidth: contentWidthArr[0],
							fontSizeOption: fontSizeOptions[0],
						});
					}}>
					<Select
						selected={selectFontFamily}
						options={fontFamilyOptions}
						onChange={setselectFontFamily}
						title='шрифт'
					/>

					<Select
						selected={selectFontSize}
						options={fontSizeOptions}
						onChange={setSelectFontSize}
						title='размер шрифта'
					/>

					<Select
						selected={selectFontColor}
						options={fontColors}
						onChange={setSelectFontColor}
						title='Цвет шрифта'
					/>

					<Select
						selected={selectBackgroundColor}
						options={backgroundColors}
						onChange={setSelectBackgroundColor}
						title='Цвет фона'
					/>

					<Select
						selected={selectContentWidth}
						options={contentWidthArr}
						onChange={setSelectContentWidth}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
