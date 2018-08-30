import React from 'react';
import { Currency, Translator } from 'orchestra';

/**
 * @param {string} title Title of the item
 * @param {number} value Value of this item
 * @param {boolean} currency If the passed value is currency
 */
export default ({ title, value, currency, name }) => {
  if (value) {
    const translatedTitle = Translator.translate(title);
    const val = currency ? Currency.format(value, 0) : value;
    return (
      <li className={name}>
        <span className="title">{translatedTitle}:</span>
        <span>{val}</span>
      </li>
    );
  }

  return null;
};
