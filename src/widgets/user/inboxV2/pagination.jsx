import { Translator } from 'orchestra';
import React from 'react';

export default function (props) {
  const previousText = Translator.translate('previous');
  const nextText = Translator.translate('next');
  const isFirstPage = props.currentPage === 1;
  const isLastPage = props.currentPage === props.pages;

  return (
    <section className="pagination">
      <button
        className={`prev ${isFirstPage ? 'disabled' : 'enabled'}`}
        onClick={props.onPrevClickHandler}
      >
        {previousText}
      </button>
      <button
        className={`next ${isLastPage ? 'disabled' : 'enabled'}`}
        onClick={props.onNextClickHandler}
      >
        {nextText}
      </button>
    </section>
  );
}
